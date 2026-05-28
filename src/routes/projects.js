const express = require("express");
const { router } = require("../../app");

router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: "proj-1", name: "DevCollab" },
      { id: "proj-2", name: "Backend" },
    ],
  });
});

router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(422).json({
      success: false,
      error: { message: "Project name is required" },
    });
  }

  const newProject = {
    id: `proj_${Date.now()}`,
    name,
    description: description || "",
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    success: true,
    data: newProject,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    data: { id, name: "DevCollab Backend" },
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  res.json({
    success: true,
    data: { id, ...update },
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(204).send();
});

module.exports = router;
