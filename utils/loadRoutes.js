const fs = require("fs");
const path = require("path");
const express = require("express");

function loadRoutes(app, basePath = "/api") {
  const routesPath = path.join(__dirname, "../routes");

  fs.readdirSync(routesPath).forEach((file) => {
    const fullPath = path.join(routesPath, file);

    // only js files are considered routes
    if (fs.lstatSync(fullPath).isFile() && file.endsWith(".js")) {
      const routeModule = require(fullPath);

      // only if exports { path, router }
      if (
        routeModule &&
        routeModule.path &&
        routeModule.router &&
        typeof routeModule.router === "function" &&
        typeof routeModule.router.use === "function"
      ) {
        if (file === "webhook.routes.js") {
          return; // webhook.routes.js ahs to be RAW, do not load
        }

        app.use(basePath + routeModule.path, routeModule.router);
        console.log(`✅ route loaded: ${basePath}${routeModule.path}`);
      } else {
        console.warn(
          `⚠️ Skipping ${file}: missing { path, router } export or invalid format`
        );
      }
    }
  });
}

module.exports = loadRoutes;
