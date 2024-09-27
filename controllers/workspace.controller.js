const Workspace = require("../model/workspace.model");
const User = require("../model/user.model");

function getWorkspaces(req, res) {
  console.log("get workspaces api fired");
  console.log(req.userId);
  User.findOne({ _id: req.userId })
    .populate("workspaces")
    .then((data) => {
      if (data) {
        res.status(200).send({ status: true, workspaces: data.workspaces });
      } else {
        res.status(404).send({ status: false, message: "user not found" });
      }
    })
    .catch((err) => {
      console.log("error occured in getworkspaces api" + err);
      res.status(500).send({
        status: false,
        message: "some internal server error occured while fetching workspaces",
      });
    });
}

function getCoworkers(req, res) {
  console.log("get coworker api fired");
  Workspace.findOne({ _id: req.body.workspaceId })
    .populate("users")
    .then((data) => {
      res.status(200).send({ status: true, users: data.users });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: false, message: "some internal server error occured" });
    });
}

module.exports = {getWorkspaces,getCoworkers};
