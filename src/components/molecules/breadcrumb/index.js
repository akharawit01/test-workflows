import React from "react";
import { compose, withHandlers } from "recompose";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadcrumbStyle from "./breadcrumb.style";
import Route from "route-parser";
import { Breadcrumb } from "antd";

const isFunction = value => typeof value === "function";
const BreadcrumbArbo = props => {
  const { match, location, getBreadcrumbs } = props;
  const [t] = useTranslation();
  const routes = {
    "/": t("common.home"),
    "/arbotena": t("common.arbotena"),
    "/arbotena/create": t("common.create_experimentee"),
    "/arbotena/:id": params => params.id
  };
  const breadcrumbs = getBreadcrumbs({ routes, match, location });
  return (
    <BreadcrumbStyle>
      <Breadcrumb>
        {breadcrumbs.map((path, i) =>
          breadcrumbs.length - 1 === i ? (
            <Breadcrumb.Item key={i}>{path.name}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={i}>
              <Link to={path.path}>{path.name}</Link>
            </Breadcrumb.Item>
          )
        )}
      </Breadcrumb>
    </BreadcrumbStyle>
  );
};

export default compose(
  withRouter,
  withHandlers({
    getPathTokens: props => pathname => {
      const paths = ["/"];
      if (pathname === "/") return paths;
      pathname.split("/").reduce((prev, curr) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
      });
      return paths;
    },
    getRouteMatch: props => (routes, path) => {
      return Object.keys(routes)
        .map(key => {
          const params = new Route(key).match(path);
          return {
            didMatch: params !== false,
            params,
            key
          };
        })
        .filter(item => item.didMatch)[0];
    }
  }),
  withHandlers({
    getBreadcrumbs: props => ({ routes, location }) => {
      const { getPathTokens, getRouteMatch } = props;
      const pathTokens = getPathTokens(location.pathname);
      return pathTokens.map((path, i) => {
        const routeMatch = getRouteMatch(routes, path);
        const routeValue = routes[routeMatch.key];
        const name = isFunction(routeValue)
          ? routeValue(routeMatch.params)
          : routeValue;
        return { name, path };
      });
    }
  })
)(BreadcrumbArbo);
