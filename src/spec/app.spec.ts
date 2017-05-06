import App from "../app";
import {expect} from "chai";

describe("App", () => {
  describe("#hello()", () => {
    it("should result in hello", () => {
      const app = new App();
      expect(app.hello()).to.eq("hello");
    });
  });
});