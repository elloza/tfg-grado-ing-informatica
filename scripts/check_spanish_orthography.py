#!/usr/bin/env python3
"""Detect common Spanish orthography issues in visible project text.

This is intentionally conservative. It does not try to replace a full
proofreading pass; it catches the recurring mistakes that are easy to ship in
this book: missing accents in common Spanish words and question headings
without the opening question mark.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]

TARGETS = [
    PROJECT_ROOT / "book" / "es",
    PROJECT_ROOT / "book" / "_config_es.yml",
    PROJECT_ROOT / "book" / "_toc_es.yml",
    PROJECT_ROOT / "book" / "_static" / "references.bib",
    PROJECT_ROOT / ".github" / "skills",
]

TEXT_SUFFIXES = {".bib", ".md", ".yml", ".yaml"}
SKIPPED_DIRS = {".git", ".venv", "_build", "__pycache__"}

COMMON_MISSING_ACCENTS = {
    "Academica": "Académica",
    "academica": "académica",
    "Academico": "Académico",
    "academico": "académico",
    "Aceptacion": "Aceptación",
    "aceptacion": "aceptación",
    "Analisis": "Análisis",
    "analisis": "análisis",
    "Ano": "Año",
    "ano": "año",
    "Automatica": "Automática",
    "automatica": "automática",
    "Autoria": "Autoría",
    "autoria": "autoría",
    "Bibliografia": "Bibliografía",
    "bibliografia": "bibliografía",
    "Bibliografico": "Bibliográfico",
    "bibliografico": "bibliográfico",
    "Codigo": "Código",
    "codigo": "código",
    "Comision": "Comisión",
    "comision": "comisión",
    "Creditos": "Créditos",
    "creditos": "créditos",
    "Critica": "Crítica",
    "critica": "crítica",
    "Critico": "Crítico",
    "critico": "crítico",
    "Descripcion": "Descripción",
    "descripcion": "descripción",
    "Despues": "Después",
    "despues": "después",
    "Diseno": "Diseño",
    "diseno": "diseño",
    "Documentacion": "Documentación",
    "documentacion": "documentación",
    "Edicion": "Edición",
    "edicion": "edición",
    "Ejecucion": "Ejecución",
    "ejecucion": "ejecución",
    "Espanol": "Español",
    "espanol": "español",
    "Estimacion": "Estimación",
    "estimacion": "estimación",
    "Evaluacion": "Evaluación",
    "evaluacion": "evaluación",
    "Gestion": "Gestión",
    "gestion": "gestión",
    "Guia": "Guía",
    "guia": "guía",
    "Indice": "Índice",
    "indice": "índice",
    "Indices": "Índices",
    "indices": "índices",
    "Informacion": "Información",
    "informacion": "información",
    "Informatica": "Informática",
    "informatica": "informática",
    "Ingenieria": "Ingeniería",
    "ingenieria": "ingeniería",
    "Instalacion": "Instalación",
    "instalacion": "instalación",
    "Integracion": "Integración",
    "integracion": "integración",
    "Introduccion": "Introducción",
    "introduccion": "introducción",
    "Logica": "Lógica",
    "logica": "lógica",
    "Metodologia": "Metodología",
    "metodologia": "metodología",
    "Pagina": "Página",
    "pagina": "página",
    "Paginas": "Páginas",
    "paginas": "páginas",
    "Planificacion": "Planificación",
    "planificacion": "planificación",
    "Practico": "Práctico",
    "practico": "práctico",
    "Precision": "Precisión",
    "precision": "precisión",
    "Programacion": "Programación",
    "programacion": "programación",
    "Publicacion": "Publicación",
    "publicacion": "publicación",
    "Redaccion": "Redacción",
    "redaccion": "redacción",
    "Relacion": "Relación",
    "relacion": "relación",
    "Revision": "Revisión",
    "revision": "revisión",
    "Solucion": "Solución",
    "solucion": "solución",
    "Tambien": "También",
    "tambien": "también",
    "Tecnica": "Técnica",
    "tecnica": "técnica",
    "Tecnico": "Técnico",
    "tecnico": "técnico",
    "Terminologica": "Terminológica",
    "terminologica": "terminológica",
    "Titulo": "Título",
    "titulo": "título",
    "Titulos": "Títulos",
    "titulos": "títulos",
    "Util": "Útil",
    "util": "útil",
    "Utiles": "Útiles",
    "utiles": "útiles",
    "Version": "Versión",
}

WORD_RE = re.compile(
    r"\b(" + "|".join(re.escape(word) for word in COMMON_MISSING_ACCENTS) + r")\b"
)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")
QUESTION_START_RE = re.compile(
    r"^(?:Que|Como|Cual|Cuales|Quien|Quienes|Cuando|Donde|Por que|Puedo|Tengo|Word o)\b"
)


@dataclass(frozen=True)
class Finding:
    path: Path
    line_no: int
    message: str
    text: str


def iter_text_files() -> list[Path]:
    files: list[Path] = []
    for target in TARGETS:
        if not target.exists():
            continue
        if target.is_file():
            files.append(target)
            continue
        for path in target.rglob("*"):
            if any(part in SKIPPED_DIRS for part in path.parts):
                continue
            if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
                files.append(path)
    return sorted(set(files))


def should_skip_line(line: str) -> bool:
    stripped = line.strip()
    return (
        not stripped
        or "http://" in stripped
        or "https://" in stripped
        or stripped.startswith("url ")
        or stripped.startswith("url=")
        or stripped.startswith("url     =")
        or stripped.startswith("file:")
        or stripped.startswith("- file:")
    )


def check_file(path: Path) -> list[Finding]:
    findings: list[Finding] = []
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except UnicodeDecodeError as exc:
        return [Finding(path, 0, f"archivo no es UTF-8 válido: {exc}", "")]

    in_fence = False
    for line_no, line in enumerate(lines, start=1):
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("````"):
            in_fence = not in_fence

        heading = HEADING_RE.match(line)
        if heading:
            text = heading.group(2).strip()
            if text.endswith("?") and not text.startswith("¿"):
                findings.append(
                    Finding(
                        path,
                        line_no,
                        "título interrogativo sin signo de apertura ¿",
                        line,
                    )
                )
            if QUESTION_START_RE.match(text) and not text.startswith("¿"):
                findings.append(
                    Finding(
                        path,
                        line_no,
                        "título interrogativo sin ¿ o interrogativo sin tilde",
                        line,
                    )
                )

        if in_fence or should_skip_line(line):
            continue

        for match in WORD_RE.finditer(line):
            word = match.group(1)
            suggestion = COMMON_MISSING_ACCENTS[word]
            findings.append(
                Finding(path, line_no, f"posible falta de tilde: {word} -> {suggestion}", line)
            )

    return findings


def main() -> int:
    findings: list[Finding] = []
    for path in iter_text_files():
        findings.extend(check_file(path))

    if not findings:
        print("OK: no se detectan faltas comunes de ortografía española.")
        return 0

    print("Problemas potenciales de ortografía española:")
    for finding in findings:
        rel = finding.path.relative_to(PROJECT_ROOT)
        location = f"{rel}:{finding.line_no}" if finding.line_no else str(rel)
        print(f"- {location}: {finding.message}")
        if finding.text:
            print(f"  {finding.text.strip()}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
