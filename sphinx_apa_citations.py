"""APA-like author-year citation style for sphinxcontrib-bibtex.

The extension keeps the standard sphinxcontrib-bibtex author-year logic, but
uses round parentheses for parenthetical and textual citations.
"""

from dataclasses import dataclass, field

from sphinxcontrib.bibtex.plugin import register_plugin
from sphinxcontrib.bibtex.style.referencing import BracketStyle
from sphinxcontrib.bibtex.style.referencing.author_year import (
    AuthorYearReferenceStyle,
)


@dataclass
class ApaAuthorYearReferenceStyle(AuthorYearReferenceStyle):
    bracket_textual: BracketStyle = field(
        default_factory=lambda: BracketStyle("(", ")")
    )
    bracket_parenthetical: BracketStyle = field(
        default_factory=lambda: BracketStyle("(", ")")
    )


def setup(app):
    register_plugin(
        "sphinxcontrib.bibtex.style.referencing",
        "apa_author_year",
        ApaAuthorYearReferenceStyle,
        force=True,
    )
    return {
        "version": "1.0",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
