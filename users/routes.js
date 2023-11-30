import * as dao from "./dao.js";
function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser({ ...req.body, _id: new Date().getTime().toString() });
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        console.log("mongo user", user)
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const currentUser = await dao.findUserById(userId);
        if (!currentUser) {
            res.status(400).json(
                { message: "account doesn't exist!" });
        }
        const status = await dao.updateUser(userId, req.body);
        console.log("update, ", req.body)
        req.session['currentUser'] = currentUser;
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        const currentUser = await dao.createUser({ _id: new Date().getTime(), ...req.body });
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
}
export default UserRoutes;

