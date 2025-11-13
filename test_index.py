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
    expect(root).to_have_title("µgfm")

def test_paragraph(root):
    root.locator("textarea").fill("Hello world")
    expect(root.locator("p")).to_have_text("Hello world")

def test_paragraphs(root):
    root.locator("textarea").fill("p1\n\np2")
    expect(root.locator("p").first).to_have_text("p1")
    expect(root.locator("p").last).to_have_text("p2")

def test_h1(root):
    root.locator("textarea").fill("# heading")
    expect(root.locator("h1")).to_have_text("heading")

def test_h2(root):
    root.locator("textarea").fill("## heading")
    expect(root.locator("h2")).to_have_text("heading")

def test_ul(root):
    root.locator("textarea").fill("- a\n- b\n- c")
    expect(root.locator("ul")).to_contain_text("a")
    expect(root.locator("li").first).to_have_text("a")
    expect(root.locator("li").last).to_have_text("c")

def test_ul_plus(root):
    root.locator("textarea").fill("+ a\n+ b\n+ c")
    expect(root.locator("ul")).to_contain_text("a")
    expect(root.locator("li").first).to_have_text("a")
    expect(root.locator("li").last).to_have_text("c")

def test_ul_star(root):
    root.locator("textarea").fill("* a\n* b\n* c")
    expect(root.locator("ul")).to_contain_text("a")
    expect(root.locator("li").first).to_have_text("a")
    expect(root.locator("li").last).to_have_text("c")

def test_ol(root):
    root.locator("textarea").fill("1. a\n2. b\n3. c")
    expect(root.locator("ol")).to_contain_text("a b c")
    expect(root.locator("li").first).to_have_text("a")
    expect(root.locator("li").last).to_have_text("c")

def test_blockquote(root):
    root.locator("textarea").fill("p\n\n> a\nb\n> c")
    expect(root.locator("blockquote")).to_contain_text("a b c")

def test_strong(root):
    root.locator("textarea").fill("**strong**")
    expect(root.locator("strong")).to_contain_text("strong")

def test_em(root):
    root.locator("textarea").fill("__em__")
    expect(root.locator("em")).to_contain_text("em")

def test_a(root):
    root.locator("textarea").fill("[example](example.com)")
    expect(root.locator("article a")).to_contain_text("example")

def test_img(root):
    root.locator("textarea").fill("![alt](example.com)")
    expect(root.get_by_alt_text("alt")).to_have_attribute("src", "example.com")

def test_img_a(root):
    root.locator("textarea").fill("[![alt](img.com)](link.com)")
    expect(root.get_by_alt_text("alt")).to_have_attribute("src", "img.com")
    expect(root.locator("article a")).to_have_attribute("href", "link.com")

def test_hr(root):
    root.locator("textarea").fill("p1\n\n---\n\np2")
    expect(root.locator("article hr")).to_be_visible()

def test_indent_code(root):
    root.locator("textarea").fill("p1\n\n    1\n\n    2\n\np2")
    expect(root.locator("article code")).to_contain_text("1 2")

def test_fence_code(root):
    root.locator("textarea").fill("p1\n\n```js\n1\n\n2\n```\n\np2")
    expect(root.locator("article code")).to_have_text("1 2")

def test_table(root):
    root.locator("textarea").fill("p1\n\n| h1 | h2 |\n|----|----|\n| a1 | a2 |\n| b1 | b2 |\n\np2")
    expect(root.locator("article tr").first).to_have_text("h1 h2")
    expect(root.locator("article tr").last).to_have_text("b1 b2")
    expect(root.locator("article thead tr")).to_have_text("h1 h2")
    expect(root.locator("article tbody tr").first).to_have_text("a1 a2")
    expect(root.locator("article tbody tr").last).to_have_text("b1 b2")

def test_escape(root):
    root.locator("textarea").fill("*\\*not bold**")
    expect(root.locator("article p")).to_have_text("**not bold**")
    expect(root.locator("article p")).not_to_have_text("\\")

def test_document(root):
    root.locator("textarea").fill("# h1\n\np1\n\np2\n\n## h2\n\np3\n\np4")
    expect(root.locator("p").first).to_have_text("p1")
    expect(root.locator("p").last).to_have_text("p4")
    expect(root.locator("h1")).to_have_text("h1")
    expect(root.locator("h2")).to_have_text("h2")
