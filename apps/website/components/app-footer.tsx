import { Footer, TestableComponent } from "@brionmario/ui";
import { FunctionComponent, ReactElement } from "react";

export type AppFooterProps = TestableComponent;

export const AppFooter: FunctionComponent<AppFooterProps> = (props: AppFooterProps): ReactElement => {

  const {
    "data-testid": testId,
    ...rest
  } = props;

  return (
    <Footer data-testid={ testId } { ...rest }>
      <Footer.Group data-testid="footer-group-1" title="Group 1">
        <Footer.Link href="#">Link 1</Footer.Link>
        <Footer.Link href="#">Link 2</Footer.Link>
        <Footer.Link href="#">Link 3</Footer.Link>
        <Footer.Link href="#">Link 4</Footer.Link>
        <Footer.Link href="#">Link 5</Footer.Link>
        <Footer.Link href="#">Link 6</Footer.Link>
      </Footer.Group>
      <Footer.Group data-testid="footer-group-2" title="Group 2">
        <Footer.Link href="#">Link 1</Footer.Link>
        <Footer.Link href="#">Link 2</Footer.Link>
        <Footer.Link href="#">Link 3</Footer.Link>
        <Footer.Link href="#">Link 4</Footer.Link>
        <Footer.Link href="#">Link 5</Footer.Link>
        <Footer.Link href="#">Link 6</Footer.Link>
      </Footer.Group>
      <Footer.Group data-testid="footer-group-3" title="Group 3">
        <Footer.Link href="#">Link 1</Footer.Link>
        <Footer.Link href="#">Link 2</Footer.Link>
        <Footer.Link href="#">Link 3</Footer.Link>
        <Footer.Link href="#">Link 4</Footer.Link>
      </Footer.Group>
      <Footer.Group data-testid="footer-group-4" title="Group 4">
        <Footer.Link href="#">Link 1</Footer.Link>
        <Footer.Link href="#">Link 2</Footer.Link>
      </Footer.Group>
    </Footer>
  );
};

const defaultProps: Partial<AppFooterProps> = {};

AppFooter.defaultProps = defaultProps;
