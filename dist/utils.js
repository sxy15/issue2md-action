"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushCommit = exports.getOwner = exports.getIssues = exports.getTitle = exports.getFilename = exports.githubToken = void 0;
const action = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const node_child_process_1 = require("node:child_process");
function githubToken() {
    return action.getInput('token');
}
exports.githubToken = githubToken;
function getFilename() {
    return action.getInput('filename');
}
exports.getFilename = getFilename;
function getTitle() {
    return action.getInput('title');
}
exports.getTitle = getTitle;
function getIssues() {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = github.getOctokit(githubToken());
        const issues = yield octokit.rest.issues.listForRepo(Object.assign({ state: 'all', sort: 'updated', per_page: 100, page: 1 }, github.context.repo));
        return issues.data;
    });
}
exports.getIssues = getIssues;
function getOwner() {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = github.getOctokit(githubToken());
        const { data } = yield octokit.rest.users.getByUsername({
            username: github.context.repo.owner
        });
        return {
            name: data.name || data.login,
            email: data.email
        };
    });
}
exports.getOwner = getOwner;
function pushCommit() {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email } = yield getOwner();
        (0, node_child_process_1.execSync)(`git config --global user.name "${name}"`);
        (0, node_child_process_1.execSync)(`git config --global user.email "${email}"`);
        (0, node_child_process_1.execSync)('git add .');
        (0, node_child_process_1.execSync)('git commit -m "update readme"');
        (0, node_child_process_1.execSync)('git push');
    });
}
exports.pushCommit = pushCommit;
