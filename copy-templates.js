const fs = require("fs-extra");

async function copyTemplates() {
  try {
    await fs.copy(
      "src/infrastructure/email/templates",
      "dist/src/infrastructure/email/templates"
    );
    console.log("Templates copied to dist/src/infrastructure/email/templates");
  } catch (err) {
    console.error("Error copying templates:", err);
  }
}

copyTemplates();
