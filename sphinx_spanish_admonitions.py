"""Spanish aliases for Sphinx/MyST admonitions.

The extension lets authors use Spanish names such as ``importante`` or
``advertencia`` while keeping Sphinx's canonical classes internally.
"""

from __future__ import annotations

from pathlib import Path

from docutils import nodes
from docutils.parsers.rst.directives import admonitions
from sphinx.directives.other import SeeAlso
from sphinx.locale import admonitionlabels


SPANISH_LABELS = {
    "attention": "Atenci\u00f3n",
    "caution": "Precauci\u00f3n",
    "danger": "Peligro",
    "error": "Error",
    "hint": "Pista",
    "important": "Importante",
    "note": "Nota",
    "seealso": "V\u00e9ase tambi\u00e9n",
    "tip": "Consejo",
    "warning": "Advertencia",
}

DIRECTIVE_ALIASES = {
    "atencion": admonitions.Attention,
    "precaucion": admonitions.Caution,
    "peligro": admonitions.Danger,
    "error": admonitions.Error,
    "pista": admonitions.Hint,
    "importante": admonitions.Important,
    "nota": admonitions.Note,
    "consejo": admonitions.Tip,
    "advertencia": admonitions.Warning,
    "aviso": admonitions.Warning,
    "ver-tambien": SeeAlso,
    "ver_tambien": SeeAlso,
    "vease-tambien": SeeAlso,
    "vease_tambien": SeeAlso,
}

CLASS_ALIASES = {
    "atencion": "attention",
    "precaucion": "caution",
    "peligro": "danger",
    "error": "error",
    "pista": "hint",
    "importante": "important",
    "nota": "note",
    "consejo": "tip",
    "advertencia": "warning",
    "aviso": "warning",
    "ver-tambien": "seealso",
    "ver_tambien": "seealso",
    "vease-tambien": "seealso",
    "vease_tambien": "seealso",
    "desplegable": "dropdown",
    "colapsable": "dropdown",
}


def get_project_language(app):
    """Return the Jupyter Book language, falling back to Sphinx's language."""
    config_path = Path(app.srcdir) / "_config.yml"
    if config_path.is_file():
        for line in config_path.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if stripped.startswith("language:"):
                return stripped.split(":", 1)[1].strip().strip("\"'")
    return str(app.config.language or "")


def localize_admonition_labels(app):
    """Use Spanish labels for standard admonitions in Spanish builds."""
    language = get_project_language(app).lower()
    if language.startswith("es"):
        admonitionlabels.update(SPANISH_LABELS)


def add_spanish_class_aliases(app, doctree, docname):
    """Add canonical Sphinx classes next to Spanish author-facing classes."""
    localize_admonition_labels(app)

    for node in doctree.findall(nodes.Element):
        classes = node.get("classes")
        if not classes:
            continue

        additions = []
        for class_name in classes:
            canonical = CLASS_ALIASES.get(class_name)
            if canonical and canonical not in classes and canonical not in additions:
                additions.append(canonical)

            if class_name.startswith("admonition-"):
                suffix = class_name.removeprefix("admonition-")
                canonical_suffix = CLASS_ALIASES.get(suffix)
                canonical_class = f"admonition-{canonical_suffix}"
                if (
                    canonical_suffix
                    and canonical_class not in classes
                    and canonical_class not in additions
                ):
                    additions.append(canonical_class)

        if additions:
            classes.extend(additions)


def setup(app):
    for alias, directive in DIRECTIVE_ALIASES.items():
        app.add_directive(alias, directive, override=True)

    app.connect("builder-inited", localize_admonition_labels)
    app.connect("doctree-resolved", add_spanish_class_aliases)
    return {
        "version": "1.0",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
