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

import { Brand, Header, TestableComponent } from "@brionmario/ui";
import { FunctionComponent, ReactElement } from "react";

export type AppHeaderProps = TestableComponent;

export const AppHeader: FunctionComponent<AppHeaderProps> = (props: AppHeaderProps): ReactElement => {

  const {
    "data-testid": testId,
    ...rest
  } = props;

  return (
    <Header
      data-testid={ testId }
      brand={ (
        <Brand
          displayName="Brion Mario" data-testid="brand"
        />
      ) }
      links={[]}
      { ...rest }
    />
  );
};

const defaultProps: Partial<AppHeaderProps> = {};

AppHeader.defaultProps = defaultProps;
