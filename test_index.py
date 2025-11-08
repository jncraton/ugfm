import re
from playwright.sync_api import Page, expect
import pytest

from pathlib import Path

file_url = Path("index.html").resolve().as_uri()

@pytest.fixture
def root(page: Page):
    page.goto(f"{file_url}#")
    return page

def test_page_title(root):
    expect(root).to_have_title("ugfm")

def test_paragraph(root):
    root.locator("textarea").fill("Hello world")
    expect(root.locator("p")).to_have_text("Hello world")

def test_paragraphs(root):
    root.locator("textarea").fill("p1\n\np2")
    expect(root.locator("p").first).to_have_text("p1")
    expect(root.locator("p").last).to_have_text("p2")
