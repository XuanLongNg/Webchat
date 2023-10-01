export class AppRoutes {
  static HOME = "/";
  static NOT_FOUND = "/404";
  static LOG_IN = "/login";
  static REGISTER = "/register";
  static COMING_SOON = "/coming-soon";
  static URL = "/:url";
  static MESSAGE = "/message/:message";
  static MESSAGE_BASE = "/message";

  /**
   * It checks if the route is an error route.
   * @param {string} route - The route to check
   * @returns A boolean value.
   */
  static isErrorRoute(route: string): boolean {
    return [this.NOT_FOUND].includes(route);
  }

  // TODO: check if the route is private
  static isPrivateRoute(route: string): boolean {
    return true;
  }

  // TODO: check if the route is public
  static isPublicRoute(route: string): boolean {
    return true;
  }
}
