import { strings } from "@strings";
import { Route as ReactRoute } from "react-router";

type Props = Record<string, unknown> & {
  title?: string;
};

// TODO: do not use effects
export class PageRoute<Path extends string = string> extends ReactRoute<
  Props,
  Path
> {
  componentDidMount(): void {
    if (this.props.title) {
      document.title = `${this.props.title} - ${strings.app.title}`;
    } else {
      document.title = strings.app.title;
    }
  }
}
