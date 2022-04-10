/**
 * MIT License
 *
 * Copyright (c) 2022 Brion Mario
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Text } from "@geist-ui/core";
import { render } from "@testing-library/react";
import Footer from "../footer";

describe("should render basic footer", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Footer>
        <Footer.Group data-testid="footer-company-group" title="Company">
          <Footer.Link href="#">Home</Footer.Link>
        </Footer.Group>
        <Footer.Group data-testid="footer-product-group" title="Product">
          <Footer.Link href="#">Pricing</Footer.Link>
        </Footer.Group>
      </Footer>
    );

    expect(() => container).not.toThrow();
  });

  it("should support custom breakpoint , maxWidth", () => {
    const { container } = render(
      <Footer breakPoint="800px" maxWidth="900px">
        <Footer.Group data-testid="footer-education-group" title="Education">
          <Footer.Link href="#">Documentation</Footer.Link>
        </Footer.Group>
        <Footer.Group data-testid="footer-more-group" title="More">
          <Footer.Link href="#">Open Source Software</Footer.Link>
        </Footer.Group>
      </Footer>
    );

    expect(container)
      .toMatchSnapshot();
  });

  it("should support footer type", () => {
    const { container } = render(
      <Footer reverse>
        <Footer.Group data-testid="footer-education-group" title="Education">
          <Footer.Link href="#">Support</Footer.Link>
        </Footer.Group>
        <Footer.Group data-testid="footer-more-group" title="More">
          <Footer.Link href="#">Open Source Software</Footer.Link>
        </Footer.Group>
      </Footer>
    );

    expect(() => container).not.toThrow();
  });

  it("should render subFooter", () => {
    const { container } = render(
      <Footer reverse subFooter="<h1>Sub-Footer</h1>">
        <Footer.Group data-testid="footer-education-group" title="Education">
          <Footer.Link href="#">Documentation</Footer.Link>
        </Footer.Group>
        <Footer.Group data-testid="footer-more-group" title="More">
          <Footer.Link href="#">Open Source Software</Footer.Link>
        </Footer.Group>
      </Footer>
    );

    expect(container)
      .toMatchSnapshot();
  });

  it("should render multi-group columns", () => {
    const { container } = render(
      <Footer subFooter={ <Text h6>Copyright © Geist React. All rights reserved.</Text> }>
        <Footer.Group data-testid="footer-product-group" title="Product">
          <Footer.Link href="#">Pricing</Footer.Link>
        </Footer.Group>
        <Footer.Column data-testid="footer-column-1">
          <Footer.Group data-testid="footer-education-group" title="Education">
            <Footer.Link href="#">Documentation</Footer.Link>
          </Footer.Group>
          <Footer.Group data-testid="footer-more-group" title="More">
            <Footer.Link href="#">Open Source Software</Footer.Link>
          </Footer.Group>
        </Footer.Column>
      </Footer>
    );

    expect(container)
      .toMatchSnapshot();
  });
});
