import Database from "../Database/index.js";
import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignIndex === -1) {
            res.send({ _id: aid, isNew: true });
            return;
        }
        res.send({...db.assignments[assignIndex], isNew: false});
    });
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        console.log("update assign", req.params)
        const assignIndex = db.assignments.findIndex(
            (a) => a._id === aid);
        if (assignIndex === -1) {
            res.status(404).send("Assignment not found");
            return;
        }
        db.assignments[assignIndex] = {
            ...db.assignments[assignIndex],
            ...req.body
        };
        res.sendStatus(204);
    });
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssign = {
            ...req.body,
            course: cid,
        };
        db.assignments.push(newAssign);
        console.log("new assignment", db.assignments)
        res.send(newAssign);
    });
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
        res.send(assignments);
    });
}

export default AssignmentRoutes;