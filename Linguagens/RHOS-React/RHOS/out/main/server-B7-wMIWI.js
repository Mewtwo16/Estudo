"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const cpfCnpjValidator = require("cpf-cnpj-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const knex = require("knex");
const require$$0 = require("fs");
const require$$1 = require("path");
const require$$2 = require("os");
const require$$3 = require("crypto");
const loginSchema = Joi.object({
  usuario: Joi.string().required(),
  senha: Joi.string().required()
});
function loginIsValid(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: `[LoginValidate ERROR]: Erro de validação ${error.message}`
      });
    next();
  };
}
const addUserSchema = Joi.object({
  full_name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  user: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  cpf: Joi.string().custom((v, helpers) => {
    const s = cpfCnpjValidator.cpf.strip(String(v));
    if (!cpfCnpjValidator.cpf.isValid(s)) return helpers.error("any.invalid");
    return s;
  }).required(),
  birth_date: Joi.date().less("now").required(),
  role: Joi.string().min(3).max(50).required(),
  status: Joi.number().required()
});
function userIsValid(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: `[UserValidate ERROR]: Erro de validação ${error.message}`
      });
    next();
  };
}
const permissionPattern = /^[a-z0-9._-]+:[a-z0-9._-]+$/;
const addProfileSchema = Joi.object({
  profile_name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(null, "").max(255),
  permissions: Joi.array().items(Joi.string().pattern(permissionPattern)).max(200).default([])
});
function profileIsValid(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: `[RoleValidate ERROR] Falha de validação: ${error.message}`
      });
    }
    if (Array.isArray(value.permissions)) {
      const unique = Array.from(new Set(value.permissions.map((p) => p.trim()))).filter(
        Boolean
      );
      value.permissions = unique;
    }
    req.body = value;
    next();
  };
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token não fornecido" });
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ success: false, message: "Erro de configuração do servidor" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.id,
      usuario: decoded.user,
      profile: decoded.role,
      permissoes: decoded.perm
    };
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Token inválido ou expirado" });
  }
}
function requirePermissions(...perms) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Não autenticado" });
    }
    const hasAllPermissions = perms.every((perm) => user.permissoes.includes(perm));
    if (!hasAllPermissions) {
      return res.status(403).json({ success: false, message: "Permissão negada" });
    }
    next();
  };
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var main = { exports: {} };
const version = "17.2.3";
const require$$4 = {
  version
};
var hasRequiredMain;
function requireMain() {
  if (hasRequiredMain) return main.exports;
  hasRequiredMain = 1;
  const fs = require$$0;
  const path = require$$1;
  const os = require$$2;
  const crypto = require$$3;
  const packageJson = require$$4;
  const version2 = packageJson.version;
  const TIPS = [
    "🔐 encrypt with Dotenvx: https://dotenvx.com",
    "🔐 prevent committing .env to code: https://dotenvx.com/precommit",
    "🔐 prevent building .env in docker: https://dotenvx.com/prebuild",
    "📡 add observability to secrets: https://dotenvx.com/ops",
    "👥 sync secrets across teammates & machines: https://dotenvx.com/ops",
    "🗂️ backup and recover secrets: https://dotenvx.com/ops",
    "✅ audit secrets and track compliance: https://dotenvx.com/ops",
    "🔄 add secrets lifecycle management: https://dotenvx.com/ops",
    "🔑 add access controls to secrets: https://dotenvx.com/ops",
    "🛠️  run anywhere with `dotenvx run -- yourcommand`",
    "⚙️  specify custom .env file path with { path: '/custom/path/.env' }",
    "⚙️  enable debug logging with { debug: true }",
    "⚙️  override existing env vars with { override: true }",
    "⚙️  suppress all logs with { quiet: true }",
    "⚙️  write to custom object with { processEnv: myObject }",
    "⚙️  load multiple .env files with { path: ['.env.local', '.env'] }"
  ];
  function _getRandomTip() {
    return TIPS[Math.floor(Math.random() * TIPS.length)];
  }
  function parseBoolean(value) {
    if (typeof value === "string") {
      return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
    }
    return Boolean(value);
  }
  function supportsAnsi() {
    return process.stdout.isTTY;
  }
  function dim(text) {
    return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
  }
  const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function parse(src) {
    const obj = {};
    let lines = src.toString();
    lines = lines.replace(/\r\n?/mg, "\n");
    let match;
    while ((match = LINE.exec(lines)) != null) {
      const key = match[1];
      let value = match[2] || "";
      value = value.trim();
      const maybeQuote = value[0];
      value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
      if (maybeQuote === '"') {
        value = value.replace(/\\n/g, "\n");
        value = value.replace(/\\r/g, "\r");
      }
      obj[key] = value;
    }
    return obj;
  }
  function _parseVault(options) {
    options = options || {};
    const vaultPath = _vaultPath(options);
    options.path = vaultPath;
    const result = DotenvModule.configDotenv(options);
    if (!result.parsed) {
      const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      err.code = "MISSING_DATA";
      throw err;
    }
    const keys = _dotenvKey(options).split(",");
    const length = keys.length;
    let decrypted;
    for (let i = 0; i < length; i++) {
      try {
        const key = keys[i].trim();
        const attrs = _instructions(result, key);
        decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
        break;
      } catch (error) {
        if (i + 1 >= length) {
          throw error;
        }
      }
    }
    return DotenvModule.parse(decrypted);
  }
  function _warn(message) {
    console.error(`[dotenv@${version2}][WARN] ${message}`);
  }
  function _debug(message) {
    console.log(`[dotenv@${version2}][DEBUG] ${message}`);
  }
  function _log(message) {
    console.log(`[dotenv@${version2}] ${message}`);
  }
  function _dotenvKey(options) {
    if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
      return options.DOTENV_KEY;
    }
    if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
      return process.env.DOTENV_KEY;
    }
    return "";
  }
  function _instructions(result, dotenvKey) {
    let uri;
    try {
      uri = new URL(dotenvKey);
    } catch (error) {
      if (error.code === "ERR_INVALID_URL") {
        const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      throw error;
    }
    const key = uri.password;
    if (!key) {
      const err = new Error("INVALID_DOTENV_KEY: Missing key part");
      err.code = "INVALID_DOTENV_KEY";
      throw err;
    }
    const environment = uri.searchParams.get("environment");
    if (!environment) {
      const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
      err.code = "INVALID_DOTENV_KEY";
      throw err;
    }
    const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
    const ciphertext = result.parsed[environmentKey];
    if (!ciphertext) {
      const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
      throw err;
    }
    return { ciphertext, key };
  }
  function _vaultPath(options) {
    let possibleVaultPath = null;
    if (options && options.path && options.path.length > 0) {
      if (Array.isArray(options.path)) {
        for (const filepath of options.path) {
          if (fs.existsSync(filepath)) {
            possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
          }
        }
      } else {
        possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
      }
    } else {
      possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
    }
    if (fs.existsSync(possibleVaultPath)) {
      return possibleVaultPath;
    }
    return null;
  }
  function _resolveHome(envPath) {
    return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
  }
  function _configVault(options) {
    const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
    const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
    if (debug || !quiet) {
      _log("Loading env from encrypted .env.vault");
    }
    const parsed = DotenvModule._parseVault(options);
    let processEnv = process.env;
    if (options && options.processEnv != null) {
      processEnv = options.processEnv;
    }
    DotenvModule.populate(processEnv, parsed, options);
    return { parsed };
  }
  function configDotenv(options) {
    const dotenvPath = path.resolve(process.cwd(), ".env");
    let encoding = "utf8";
    let processEnv = process.env;
    if (options && options.processEnv != null) {
      processEnv = options.processEnv;
    }
    let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
    let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
    if (options && options.encoding) {
      encoding = options.encoding;
    } else {
      if (debug) {
        _debug("No encoding is specified. UTF-8 is used by default");
      }
    }
    let optionPaths = [dotenvPath];
    if (options && options.path) {
      if (!Array.isArray(options.path)) {
        optionPaths = [_resolveHome(options.path)];
      } else {
        optionPaths = [];
        for (const filepath of options.path) {
          optionPaths.push(_resolveHome(filepath));
        }
      }
    }
    let lastError;
    const parsedAll = {};
    for (const path2 of optionPaths) {
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
        DotenvModule.populate(parsedAll, parsed, options);
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${path2} ${e.message}`);
        }
        lastError = e;
      }
    }
    const populated = DotenvModule.populate(processEnv, parsedAll, options);
    debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
    quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
    if (debug || !quiet) {
      const keysCount = Object.keys(populated).length;
      const shortPaths = [];
      for (const filePath of optionPaths) {
        try {
          const relative = path.relative(process.cwd(), filePath);
          shortPaths.push(relative);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${filePath} ${e.message}`);
          }
          lastError = e;
        }
      }
      _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
    }
    if (lastError) {
      return { parsed: parsedAll, error: lastError };
    } else {
      return { parsed: parsedAll };
    }
  }
  function config2(options) {
    if (_dotenvKey(options).length === 0) {
      return DotenvModule.configDotenv(options);
    }
    const vaultPath = _vaultPath(options);
    if (!vaultPath) {
      _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
      return DotenvModule.configDotenv(options);
    }
    return DotenvModule._configVault(options);
  }
  function decrypt(encrypted, keyStr) {
    const key = Buffer.from(keyStr.slice(-64), "hex");
    let ciphertext = Buffer.from(encrypted, "base64");
    const nonce = ciphertext.subarray(0, 12);
    const authTag = ciphertext.subarray(-16);
    ciphertext = ciphertext.subarray(12, -16);
    try {
      const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
      aesgcm.setAuthTag(authTag);
      return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
    } catch (error) {
      const isRange = error instanceof RangeError;
      const invalidKeyLength = error.message === "Invalid key length";
      const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
      if (isRange || invalidKeyLength) {
        const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      } else if (decryptionFailed) {
        const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        err.code = "DECRYPTION_FAILED";
        throw err;
      } else {
        throw error;
      }
    }
  }
  function populate(processEnv, parsed, options = {}) {
    const debug = Boolean(options && options.debug);
    const override = Boolean(options && options.override);
    const populated = {};
    if (typeof parsed !== "object") {
      const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      err.code = "OBJECT_REQUIRED";
      throw err;
    }
    for (const key of Object.keys(parsed)) {
      if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
        if (override === true) {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
        if (debug) {
          if (override === true) {
            _debug(`"${key}" is already defined and WAS overwritten`);
          } else {
            _debug(`"${key}" is already defined and was NOT overwritten`);
          }
        }
      } else {
        processEnv[key] = parsed[key];
        populated[key] = parsed[key];
      }
    }
    return populated;
  }
  const DotenvModule = {
    configDotenv,
    _configVault,
    _parseVault,
    config: config2,
    decrypt,
    parse,
    populate
  };
  main.exports.configDotenv = DotenvModule.configDotenv;
  main.exports._configVault = DotenvModule._configVault;
  main.exports._parseVault = DotenvModule._parseVault;
  main.exports.config = DotenvModule.config;
  main.exports.decrypt = DotenvModule.decrypt;
  main.exports.parse = DotenvModule.parse;
  main.exports.populate = DotenvModule.populate;
  main.exports = DotenvModule;
  return main.exports;
}
var mainExports = requireMain();
const dotenv = /* @__PURE__ */ getDefaultExportFromCjs(mainExports);
dotenv.config();
const config = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    }
  }
};
const db = knex(config.development);
class LogService {
  async write(entry, trx) {
    try {
      const query = trx ? trx("audit_logs") : db("audit_logs");
      await query.insert({
        user_id: entry.user_id || null,
        who: entry.who || null,
        where: entry.where,
        what: entry.what
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async list(limit) {
    try {
      const query = db("audit_logs").select("id", "user_id", "who", "where", "when", "what").orderBy("when", "desc");
      const logs = limit ? await query.limit(limit) : await query;
      return { success: true, data: logs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
const logService = new LogService();
class AuthService {
  async login(usuario, senha) {
    try {
      const user = await db("users").where({ login: usuario }).first();
      if (!user) {
        await logService.write({
          user_id: null,
          who: usuario,
          where: "auth",
          what: "Login failed: user not found"
        });
        return { success: false, message: "Usuário inválido ou inexistente" };
      }
      if (user.status !== 1) {
        await logService.write({
          user_id: user.id,
          who: usuario,
          where: "auth",
          what: "Login failed: user inactive"
        });
        return { success: false, message: "Usuário desativado" };
      }
      const senhaOk = await bcrypt.compare(senha, user.password_hash);
      if (!senhaOk) {
        await logService.write({
          user_id: user.id,
          who: usuario,
          where: "auth",
          what: "Login failed: invalid password"
        });
        return { success: false, message: "Senha inválida" };
      }
      const permissions = await this.getUserPermissions(user.id);
      const roles = await this.getUserRoles(user.id);
      const secret = process.env.JWT_SECRET;
      if (!secret) return { success: false, message: "Configuração interna ausente (JWT_SECRET)" };
      const token = jwt.sign(
        { id: user.id, user: user.login, role: roles, perm: permissions },
        secret,
        { expiresIn: "8h" }
      );
      await logService.write({
        user_id: user.id,
        who: usuario,
        where: "auth",
        what: "Login successful"
      });
      return { success: true, message: "Login bem-sucedido", token };
    } catch (error) {
      return { success: false, message: "Falha interna ao autenticar" };
    }
  }
  async getUserPermissions(userId) {
    try {
      const permissions = await db("allowed").join("profile_permissions", "allowed.id", "=", "profile_permissions.permission_id").join("profile_users", "profile_permissions.profile_id", "=", "profile_users.profile_id").where("profile_users.users_id", userId).distinct("allowed.permission_name").pluck("permission_name");
      return permissions;
    } catch {
      return [];
    }
  }
  async getUserRoles(userId) {
    try {
      const roles = await db("profiles").join("profile_users", "profiles.id", "=", "profile_users.profile_id").where("profile_users.users_id", userId).distinct("profiles.profile_name").pluck("profile_name");
      return roles;
    } catch {
      return [];
    }
  }
}
const authService = new AuthService();
async function loginRoute(req, res) {
  try {
    const { usuario, senha } = req.body;
    const loginResponse = await authService.login(usuario, senha);
    if (loginResponse.success) {
      res.json({
        success: true,
        message: loginResponse.message,
        token: loginResponse.token
      });
    } else {
      res.status(401).json(loginResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
class UserService {
  async addUser(userData, loggedUser) {
    try {
      const senhaHash = await bcrypt.hash(userData.password, 10);
      await db.transaction(async (trx) => {
        const [newUserID] = await trx("users").insert({
          full_name: userData.full_name,
          email: userData.email,
          cpf: userData.cpf,
          birth_date: userData.birth_date,
          login: userData.user,
          password_hash: senhaHash,
          status: userData.status,
          creation_date: /* @__PURE__ */ new Date()
        });
        const role = await trx("profiles").where({ profile_name: userData.role }).first();
        if (!role) throw new Error(`Cargo '${userData.role}' não encontrado`);
        await trx("profile_users").insert({
          users_id: newUserID,
          profile_id: role.id
        });
        await logService.write({
          user_id: loggedUser?.id || null,
          who: loggedUser?.usuario || "system",
          where: "users",
          what: `Criou usuário ${userData.user} com cargo ${userData.role}`
        }, trx);
      });
      return { success: true, message: "Usuário criado com sucesso" };
    } catch (error) {
      return { success: false, message: error.message || "Erro ao criar usuário" };
    }
  }
  async showUser(options) {
    try {
      const query = db("users as u").leftJoin("profile_users as pu", "pu.users_id", "u.id").leftJoin("profiles as p", "p.id", "pu.profile_id").select(
        "u.id",
        "u.full_name",
        "u.email",
        "u.login",
        "u.cpf",
        "u.birth_date",
        "u.status",
        db.raw('COALESCE(p.profile_name, "") as role')
      );
      if (options.id) query.where("u.id", options.id);
      else if (options.full_name) query.where("u.full_name", "like", `%${options.full_name}%`);
      else if (options.email) query.where("u.email", "like", `%${options.email}%`);
      else if (options.login) query.where("u.login", "like", `%${options.login}%`);
      else if (options.cpf) query.where("u.cpf", "like", `${options.cpf.replace(/\D+/g, "")}%`);
      else if (options.role) query.where("p.profile_name", "like", `%${options.role}%`);
      else return null;
      return await query.first();
    } catch (error) {
      throw new Error("Falha ao buscar usuário");
    }
  }
  async listAllUsers() {
    try {
      const users = await db("users as u").leftJoin("profile_users as pu", "pu.users_id", "u.id").leftJoin("profiles as p", "p.id", "pu.profile_id").select(
        "u.id",
        "u.full_name",
        "u.email",
        "u.login",
        "u.cpf",
        "u.birth_date",
        "u.status",
        "u.creation_date",
        db.raw('COALESCE(p.profile_name, "") as role')
      ).orderBy("u.full_name", "asc");
      return users;
    } catch (error) {
      throw new Error("Falha ao listar usuários");
    }
  }
  async updateUser(userId, userData, loggedUser) {
    try {
      await db.transaction(async (trx) => {
        const existingUser = await trx("users").where({ id: userId }).first();
        if (!existingUser) {
          throw new Error("Usuário não encontrado");
        }
        const updateData = {};
        if (userData.full_name) updateData.full_name = userData.full_name;
        if (userData.email) updateData.email = userData.email;
        if (userData.cpf) updateData.cpf = userData.cpf;
        if (userData.birth_date) updateData.birth_date = userData.birth_date;
        if (userData.status !== void 0) updateData.status = userData.status;
        if (userData.password) {
          const senhaHash = await bcrypt.hash(userData.password, 10);
          updateData.password_hash = senhaHash;
        }
        if (Object.keys(updateData).length > 0) {
          await trx("users").where({ id: userId }).update(updateData);
        }
        if (userData.role) {
          const role = await trx("profiles").where({ profile_name: userData.role }).first();
          if (!role) throw new Error(`Cargo '${userData.role}' não encontrado`);
          await trx("profile_users").where({ users_id: userId }).delete();
          await trx("profile_users").insert({
            users_id: userId,
            profile_id: role.id
          });
        }
        await logService.write({
          user_id: loggedUser?.id || null,
          who: loggedUser?.usuario || "system",
          where: "users",
          what: `Atualizou usuário ${userData.user || existingUser.login}`
        }, trx);
      });
      return { success: true, message: "Usuário atualizado com sucesso" };
    } catch (error) {
      return { success: false, message: error.message || "Erro ao atualizar usuário" };
    }
  }
}
const userService = new UserService();
async function addUserRoute(req, res) {
  try {
    const userData = req.body;
    const loggedUser = req.user;
    const userResponse = await userService.addUser(userData, loggedUser);
    if (userResponse.success) {
      res.json({
        success: true,
        message: `Sucesso na criação do usuario!`
      });
    } else {
      res.status(400).json(userResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message || error });
  }
}
async function getUserRoute(req, res) {
  try {
    const { id, full_name, email, login, cpf, role } = req.query;
    const provided = [id, full_name, email, login, cpf, role].filter((v) => v !== void 0);
    if (provided.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Informe um parâmetro de busca: id, full_name, email, login, cpf ou role."
      });
    }
    if (provided.length > 1) {
      return res.status(400).json({
        success: false,
        message: "Informe apenas um parâmetro de busca por requisição."
      });
    }
    const opts = {};
    if (id && !isNaN(Number(id))) opts.id = Number(id);
    else if (typeof full_name === "string") opts.full_name = full_name;
    else if (typeof email === "string") opts.email = email;
    else if (typeof login === "string") opts.login = login;
    else if (typeof cpf === "string") opts.cpf = cpf;
    else if (typeof role === "string") opts.role = role;
    const user = await userService.showUser(opts);
    if (!user) return res.status(404).json({ success: false, message: "Usuário não encontrado." });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message || error });
  }
}
async function listUsersRoute(req, res) {
  try {
    const users = await userService.listAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message || error });
  }
}
async function updateUserRoute(req, res) {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }
    const userData = req.body;
    const loggedUser = req.user;
    const userResponse = await userService.updateUser(userId, userData, loggedUser);
    if (userResponse.success) {
      res.json({
        success: true,
        message: userResponse.message || "Usuário atualizado com sucesso."
      });
    } else {
      res.status(400).json(userResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error?.message || error });
  }
}
class Health {
  async tryDB() {
    await db.raw("select 1");
  }
}
const health = new Health();
async function healthRoute(req, res) {
  try {
    const healthResponse = await health.tryDB();
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error?.message ?? "DB connection failed" });
  }
}
class ProfileService {
  async addProfile(profileData, loggedUser) {
    try {
      const result = await db.transaction(async (trx) => {
        const [profileId] = await trx("profiles").insert({
          profile_name: profileData.profile_name,
          description: profileData.description || null
        });
        const permissions = profileData.permissions || [];
        const assigned = [];
        for (const perm of permissions) {
          let allowed = await trx("allowed").where({ permission_name: perm }).first();
          if (!allowed) {
            const [newId] = await trx("allowed").insert({ permission_name: perm });
            allowed = { id: newId, permission_name: perm };
          }
          const exists = await trx("profile_permissions").where({ profile_id: profileId, permission_id: allowed.id }).first();
          if (!exists) {
            await trx("profile_permissions").insert({
              profile_id: profileId,
              permission_id: allowed.id
            });
            assigned.push(perm);
          }
        }
        await logService.write({
          user_id: loggedUser?.id || null,
          who: loggedUser?.usuario || "system",
          where: "profiles",
          what: `Criou cargo ${profileData.profile_name} com ${assigned.length} permissões`
        }, trx);
        return { profileId, assigned };
      });
      return {
        success: true,
        message: `Cargo criado com ${result.assigned.length} permissões`
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao criar cargo"
      };
    }
  }
  async searchProfiles(options) {
    try {
      const query = db("profiles as p").select("p.id", "p.profile_name", "p.description");
      if (options.id) {
        query.where("p.id", options.id);
      } else if (options.profile_name) {
        query.where("p.profile_name", "like", `%${options.profile_name}%`);
      } else if (options.description) {
        query.where("p.description", "like", `%${options.description}%`);
      } else {
        return { success: false, message: "Parâmetro de busca inválido" };
      }
      const profile = await query.first();
      if (!profile) return { success: true, data: null };
      const permissions = await db("allowed as a").join("profile_permissions as ra", "ra.permission_id", "a.id").where("ra.profile_id", profile.id).distinct("a.permission_name").pluck("permission_name");
      return {
        success: true,
        data: { ...profile, permissions }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao buscar cargo"
      };
    }
  }
  async listAllProfiles() {
    try {
      const profiles = await db("profiles").select("id", "profile_name", "description").orderBy("profile_name", "asc");
      const profilesWithPermissions = await Promise.all(
        profiles.map(async (profile) => {
          const permissions = await db("allowed as a").join("profile_permissions as ra", "ra.permission_id", "a.id").where("ra.profile_id", profile.id).distinct("a.permission_name").pluck("permission_name");
          return { ...profile, permissions };
        })
      );
      return { success: true, data: profilesWithPermissions };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao listar cargos"
      };
    }
  }
  async updateProfile(profileId, profileData, loggedUser) {
    try {
      const result = await db.transaction(async (trx) => {
        const existingProfile = await trx("profiles").where({ id: profileId }).first();
        if (!existingProfile) {
          throw new Error("Cargo não encontrado");
        }
        if (profileData.description !== void 0) {
          await trx("profiles").where({ id: profileId }).update({ description: profileData.description });
        }
        let assigned = [];
        if (profileData.permissions) {
          await trx("profile_permissions").where({ profile_id: profileId }).delete();
          for (const perm of profileData.permissions) {
            let allowed = await trx("allowed").where({ permission_name: perm }).first();
            if (!allowed) {
              const [newId] = await trx("allowed").insert({ permission_name: perm });
              allowed = { id: newId, permission_name: perm };
            }
            await trx("profile_permissions").insert({
              profile_id: profileId,
              permission_id: allowed.id
            });
            assigned.push(perm);
          }
        }
        await logService.write({
          user_id: loggedUser?.id || null,
          who: loggedUser?.usuario || "system",
          where: "profiles",
          what: `Atualizou cargo ${existingProfile.profile_name} com ${assigned.length} permissões`
        }, trx);
        return { assigned };
      });
      return {
        success: true,
        message: `Cargo atualizado com sucesso`
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Erro ao atualizar cargo"
      };
    }
  }
}
const profileService = new ProfileService();
async function addProfileRoute(req, res) {
  try {
    const profileData = req.body;
    const loggedUser = req.user;
    const profileResponse = await profileService.addProfile(profileData, loggedUser);
    if (profileResponse.success) {
      res.json({
        success: true,
        message: profileResponse.message || "Sucesso na criação do cargo."
      });
    } else {
      res.status(400).json(profileResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}
async function getProfileRoute(req, res) {
  try {
    const { id, profile_name, description } = req.query;
    const opts = {};
    if (id && !isNaN(Number(id))) {
      opts.id = Number(id);
    } else if (profile_name && typeof profile_name === "string") {
      opts.profile_name = profile_name;
    } else if (description && typeof description === "string") {
      opts.description = description;
    } else {
      return res.status(400).json({
        success: false,
        message: "Informe id, profile_name ou description como query."
      });
    }
    const profileResponse = await profileService.searchProfiles(opts);
    if (profileResponse.success && profileResponse.data) {
      res.json({ success: true, data: profileResponse.data });
    } else if (profileResponse.success && !profileResponse.data) {
      res.status(404).json({ success: false, message: "Cargo não encontrado." });
    } else {
      res.status(500).json(profileResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}
async function listProfilesRoute(req, res) {
  try {
    const profileResponse = await profileService.listAllProfiles();
    if (profileResponse.success) {
      res.json({ success: true, data: profileResponse.data });
    } else {
      res.status(500).json(profileResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}
async function updateProfileRoute(req, res) {
  try {
    const profileId = parseInt(req.params.id, 10);
    if (isNaN(profileId)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }
    const profileData = req.body;
    const loggedUser = req.user;
    const profileResponse = await profileService.updateProfile(profileId, profileData, loggedUser);
    if (profileResponse.success) {
      res.json({
        success: true,
        message: profileResponse.message || "Cargo atualizado com sucesso."
      });
    } else {
      res.status(400).json(profileResponse);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}
class AllowedService {
  async listAll() {
    try {
      const rows = await db("allowed").select("id", "permission_name").orderBy("permission_name", "asc");
      return { success: true, data: rows };
    } catch (error) {
      return {
        success: false,
        message: `[AllowedService ERROR] Falha ao listar permissões: ${error}`
      };
    }
  }
}
const allowedService = new AllowedService();
async function getAllowedRoute(_req, res) {
  try {
    const r = await allowedService.listAll();
    if (!r.success) return res.status(500).json(r);
    return res.json(r);
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message || String(error) });
  }
}
async function getLogsRoute(req, res) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : void 0;
    const result = await logService.list(limit);
    if (result.success) {
      return res.json({ success: true, data: result.data });
    }
    return res.status(500).json({
      success: false,
      message: result.error || "Falha ao listar logs"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Erro ao buscar logs"
    });
  }
}
class CargoService {
  async listarCargos(apenasAtivos = true) {
    const query = db("positions").orderBy("position_name");
    if (apenasAtivos) {
      query.where("active", 1);
    }
    return await query;
  }
  async buscarCargoPorId(id) {
    const cargo = await db("positions").where("id", id).first();
    return cargo || null;
  }
  async criarCargo(cargo) {
    const [id] = await db("positions").insert({
      position_name: cargo.position_name,
      description: cargo.description || null,
      base_salary: cargo.base_salary,
      weekly_hours: cargo.weekly_hours || 44,
      level: cargo.level || null,
      department: cargo.department || null,
      active: cargo.active !== false ? 1 : 0
    });
    return id;
  }
  async atualizarCargo(id, cargo) {
    const dadosAtualizacao = {};
    if (cargo.position_name !== void 0) dadosAtualizacao.position_name = cargo.position_name;
    if (cargo.description !== void 0) dadosAtualizacao.description = cargo.description;
    if (cargo.base_salary !== void 0) dadosAtualizacao.base_salary = cargo.base_salary;
    if (cargo.weekly_hours !== void 0) dadosAtualizacao.weekly_hours = cargo.weekly_hours;
    if (cargo.level !== void 0) dadosAtualizacao.level = cargo.level;
    if (cargo.department !== void 0) dadosAtualizacao.department = cargo.department;
    if (cargo.active !== void 0) dadosAtualizacao.active = cargo.active ? 1 : 0;
    if (Object.keys(dadosAtualizacao).length === 0) {
      return false;
    }
    const result = await db("positions").where("id", id).update(dadosAtualizacao);
    return result > 0;
  }
  async deletarCargo(id) {
    const result = await db("positions").where("id", id).update({ active: 0 });
    return result > 0;
  }
  async cargoEmUso(id) {
    const count = await db("employees").where("position_id", id).where("status", "ativo").count("* as count").first();
    return count?.count > 0;
  }
}
const positionService = new CargoService();
const router$1 = express.Router();
router$1.get("/", async (req, res) => {
  try {
    const apenasAtivos = req.query.actives !== "false";
    const cargos = await positionService.listarCargos(apenasAtivos);
    res.json({
      success: true,
      data: cargos
    });
  } catch (error) {
    console.error("Erro ao listar cargos:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao listar cargos"
    });
  }
});
router$1.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cargo = await positionService.buscarCargoPorId(id);
    if (!cargo) {
      return res.status(404).json({
        success: false,
        message: "Cargo não encontrado"
      });
    }
    res.json({
      success: true,
      data: cargo
    });
  } catch (error) {
    console.error("Erro ao buscar cargo:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar cargo"
    });
  }
});
router$1.post("/", async (req, res) => {
  try {
    const { position_name, description, base_salary, weekly_hours, level, department } = req.body;
    if (!position_name || !base_salary) {
      return res.status(400).json({
        success: false,
        message: "Nome do cargo e salário base são obrigatórios"
      });
    }
    const id = await positionService.criarCargo(req.body);
    await logService.write({
      user_id: req.user?.id,
      who: req.user?.usuario || "Sistema",
      where: "Cargos CLT",
      what: `Criou o cargo: ${position_name}`
    });
    res.status(201).json({
      success: true,
      message: "Cargo criado com sucesso",
      data: { id }
    });
  } catch (error) {
    console.error("Erro ao criar cargo:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar cargo"
    });
  }
});
router$1.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cargo = await positionService.buscarCargoPorId(id);
    if (!cargo) {
      return res.status(404).json({
        success: false,
        message: "Cargo não encontrado"
      });
    }
    const sucesso = await positionService.atualizarCargo(id, req.body);
    if (sucesso) {
      await logService.write({
        user_id: req.user?.id,
        who: req.user?.usuario || "Sistema",
        where: "Cargos CLT",
        what: `Atualizou o cargo: ${cargo.position_name}`
      });
      res.json({
        success: true,
        message: "Cargo atualizado com sucesso"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Nenhuma alteração realizada"
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar cargo:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar cargo"
    });
  }
});
router$1.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cargo = await positionService.buscarCargoPorId(id);
    if (!cargo) {
      return res.status(404).json({
        success: false,
        message: "Cargo não encontrado"
      });
    }
    const emUso = await positionService.cargoEmUso(id);
    if (emUso) {
      return res.status(400).json({
        success: false,
        message: "Não é possível deletar. Cargo está vinculado a funcionários ativos"
      });
    }
    const sucesso = await positionService.deletarCargo(id);
    if (sucesso) {
      await logService.write({
        user_id: req.user?.id,
        who: req.user?.usuario || "Sistema",
        where: "Cargos CLT",
        what: `Deletou o cargo: ${cargo.position_name}`
      });
      res.json({
        success: true,
        message: "Cargo deletado com sucesso"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Erro ao deletar cargo"
      });
    }
  } catch (error) {
    console.error("Erro ao deletar cargo:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao deletar cargo"
    });
  }
});
class FuncionarioService {
  async listarFuncionarios(status) {
    let query = db("employees as f").leftJoin("positions as c", "f.position_id", "c.id").select(
      "f.*",
      "c.position_name",
      "c.level",
      "c.department"
    ).orderBy("f.full_name");
    if (status) {
      query = query.where("f.status", status);
    }
    return await query;
  }
  async buscarFuncionarioPorId(id) {
    const funcionario = await db("employees as f").leftJoin("positions as c", "f.position_id", "c.id").select(
      "f.*",
      "c.position_name",
      "c.level",
      "c.department",
      "c.base_salary"
    ).where("f.id", id).first();
    return funcionario || null;
  }
  async buscarFuncionarioPorCPF(cpf) {
    const funcionario = await db("employees").where("cpf", cpf).first();
    return funcionario || null;
  }
  async criarFuncionario(funcionario) {
    const [id] = await db("employees").insert({
      full_name: funcionario.full_name,
      cpf: funcionario.cpf,
      rg: funcionario.rg || null,
      birth_date: funcionario.birth_date,
      gender: funcionario.gender || null,
      marital_status: funcionario.marital_status || null,
      nationality: funcionario.nationality || "Brasileiro",
      phone: funcionario.phone || null,
      email: funcionario.email || null,
      zip_code: funcionario.zip_code || null,
      street: funcionario.street || null,
      street_number: funcionario.street_number || null,
      complement: funcionario.complement || null,
      neighborhood: funcionario.neighborhood || null,
      city: funcionario.city || null,
      state: funcionario.state || null,
      position_id: funcionario.position_id,
      hire_date: funcionario.hire_date,
      termination_date: funcionario.termination_date || null,
      status: funcionario.status || "ativo",
      contract_type: funcionario.contract_type || "CLT",
      bank: funcionario.bank || null,
      agency: funcionario.agency || null,
      account: funcionario.account || null,
      account_type: funcionario.account_type || null,
      current_salary: funcionario.current_salary,
      transportation_voucher: funcionario.transportation_voucher ? 1 : 0,
      meal_voucher: funcionario.meal_voucher || 0,
      health_insurance: funcionario.health_insurance ? 1 : 0,
      dental_insurance: funcionario.dental_insurance ? 1 : 0,
      dependents: funcionario.dependents || 0,
      ctps_numero: funcionario.ctps_numero || null,
      ctps_serie: funcionario.ctps_serie || null,
      ctps_uf: funcionario.ctps_uf || null,
      pis_pasep: funcionario.pis_pasep || null,
      titulo_eleitor: funcionario.titulo_eleitor || null,
      notes: funcionario.notes || null
    });
    return id;
  }
  async atualizarFuncionario(id, funcionario) {
    const dadosAtualizacao = {};
    Object.keys(funcionario).forEach((key) => {
      const typedKey = key;
      if (funcionario[typedKey] !== void 0) {
        dadosAtualizacao[key] = funcionario[typedKey];
      }
    });
    if (Object.keys(dadosAtualizacao).length === 0) {
      return false;
    }
    const result = await db("employees").where("id", id).update(dadosAtualizacao);
    return result > 0;
  }
  async inativarFuncionario(id, dataDesligamento) {
    const result = await db("employees").where("id", id).update({
      status: "demitido",
      termination_date: dataDesligamento
    });
    return result > 0;
  }
  calcularINSS(salarioBruto) {
    const faixas = [
      { limite: 1412, aliquota: 0.075, limiteAnterior: 0 },
      // 7,5%
      { limite: 2666.68, aliquota: 0.09, limiteAnterior: 1412 },
      // 9%
      { limite: 4000.03, aliquota: 0.12, limiteAnterior: 2666.68 },
      // 12%
      { limite: 7786.02, aliquota: 0.14, limiteAnterior: 4000.03 }
      // 14%
    ];
    let inss = 0;
    let salarioRestante = salarioBruto;
    for (const faixa of faixas) {
      if (salarioRestante <= 0) break;
      const baseCalculo = Math.min(salarioRestante, faixa.limite - faixa.limiteAnterior);
      inss += baseCalculo * faixa.aliquota;
      salarioRestante -= baseCalculo;
    }
    return Math.min(inss, 908.86);
  }
  calcularIRRF(salarioBruto, inss, dependents) {
    const deducaoPorDependente = 189.59;
    const baseCalculo = salarioBruto - inss - deducaoPorDependente * dependents;
    if (baseCalculo <= 2259.2) return 0;
    if (baseCalculo <= 2826.65) return Math.max(0, baseCalculo * 0.075 - 169.44);
    if (baseCalculo <= 3751.05) return Math.max(0, baseCalculo * 0.15 - 381.44);
    if (baseCalculo <= 4664.68) return Math.max(0, baseCalculo * 0.225 - 662.77);
    return Math.max(0, baseCalculo * 0.275 - 896);
  }
  calcularEncargosPatronais(salarioBruto) {
    const inssPatronal = salarioBruto * 0.2;
    const rat = salarioBruto * 0.02;
    const sistemaS = salarioBruto * 0.058;
    const salarioEducacao = salarioBruto * 0.025;
    const fgts = salarioBruto * 0.08;
    const total = inssPatronal + rat + sistemaS + salarioEducacao + fgts;
    return {
      inssPatronal,
      rat,
      sistemaS,
      salarioEducacao,
      fgts,
      total
      // Total: 38,3%
    };
  }
  async calcularFolhaPagamento(idFuncionario) {
    const funcionario = await this.buscarFuncionarioPorId(idFuncionario);
    if (!funcionario) {
      throw new Error("Funcionário não encontrado");
    }
    const salarioBruto = Number(funcionario.current_salary) || 0;
    const inss = this.calcularINSS(salarioBruto);
    const dependentes = Number(funcionario.dependents) || 0;
    const irrf = this.calcularIRRF(salarioBruto, inss, dependentes);
    let valeTransporteDesc = 0;
    if (funcionario.transportation_voucher) {
      valeTransporteDesc = salarioBruto * 0.06;
    }
    const totalDescontos = inss + irrf + valeTransporteDesc;
    const salarioLiquido = salarioBruto - totalDescontos;
    const encargos = this.calcularEncargosPatronais(salarioBruto);
    const beneficiosEmpresa = Number(funcionario.meal_voucher) || 0;
    const custoTotal = salarioBruto + encargos.total + beneficiosEmpresa;
    return {
      salarioBruto,
      inss,
      irrf,
      valeTransporteDesc,
      totalDescontos,
      salarioLiquido,
      fgts: encargos.fgts,
      inssPatronal: encargos.inssPatronal,
      rat: encargos.rat,
      sistemaS: encargos.sistemaS,
      salarioEducacao: encargos.salarioEducacao,
      totalEncargos: encargos.total,
      custoTotal
    };
  }
  async obterEstatisticas() {
    const totalAtivos = await db("employees").where("status", "ativo").count("* as count").first();
    const totalFuncionarios = await db("employees").count("* as count").first();
    const custoTotal = await db("employees").where("status", "ativo").sum("current_salary as total").first();
    return {
      totalAtivos: totalAtivos?.count || 0,
      totalFuncionarios: totalFuncionarios?.count || 0,
      custoSalarios: custoTotal?.total || 0,
      custoTotalEstimado: (custoTotal?.total || 0) * 1.383
      // Incluindo encargos médios
    };
  }
}
const employeeService = new FuncionarioService();
const addEmployeeSchema = Joi.object({
  // Dados Pessoais (Obrigatórios)
  full_name: Joi.string().min(3).max(200).required().messages({
    "string.empty": "Nome completo é obrigatório",
    "string.min": "Nome deve ter no mínimo 3 caracteres",
    "string.max": "Nome deve ter no máximo 200 caracteres",
    "any.required": "Nome completo é obrigatório"
  }),
  cpf: Joi.string().length(11).pattern(/^\d+$/).required().messages({
    "string.empty": "CPF é obrigatório",
    "string.length": "CPF deve ter 11 dígitos",
    "string.pattern.base": "CPF deve conter apenas números",
    "any.required": "CPF é obrigatório"
  }),
  birth_date: Joi.date().iso().max("now").required().messages({
    "date.base": "Data de nascimento inválida",
    "date.max": "Data de nascimento não pode ser futura",
    "any.required": "Data de nascimento é obrigatória"
  }),
  // Dados Pessoais (Opcionais)
  rg: Joi.string().max(20).allow(null, "").optional(),
  gender: Joi.string().max(20).allow(null, "").optional(),
  marital_status: Joi.string().max(30).allow(null, "").optional(),
  nationality: Joi.string().max(50).default("Brasileiro").optional(),
  // Contato
  phone: Joi.string().max(20).allow(null, "").optional(),
  email: Joi.string().email().max(100).allow(null, "").optional().messages({
    "string.email": "E-mail inválido"
  }),
  // Endereço
  zip_code: Joi.string().max(10).allow(null, "").optional(),
  street: Joi.string().max(200).allow(null, "").optional(),
  street_number: Joi.string().max(10).allow(null, "").optional(),
  complement: Joi.string().max(100).allow(null, "").optional(),
  neighborhood: Joi.string().max(100).allow(null, "").optional(),
  city: Joi.string().max(100).allow(null, "").optional(),
  state: Joi.string().length(2).allow(null, "").optional().messages({
    "string.length": "Estado deve ter 2 caracteres (UF)"
  }),
  // Dados de Trabalho (Obrigatórios)
  position_id: Joi.number().integer().positive().required().messages({
    "number.base": "Cargo inválido",
    "number.positive": "ID do cargo deve ser positivo",
    "any.required": "Cargo é obrigatório"
  }),
  hire_date: Joi.date().iso().max("now").required().messages({
    "date.base": "Data de admissão inválida",
    "date.max": "Data de admissão não pode ser futura",
    "any.required": "Data de admissão é obrigatória"
  }),
  current_salary: Joi.number().positive().precision(2).required().messages({
    "number.base": "Salário inválido",
    "number.positive": "Salário deve ser maior que zero",
    "any.required": "Salário é obrigatório"
  }),
  // Dados de Trabalho (Opcionais)
  termination_date: Joi.date().iso().allow(null).optional(),
  status: Joi.string().max(20).default("ativo").optional(),
  contract_type: Joi.string().max(30).default("CLT").optional(),
  // Dados Bancários
  bank: Joi.string().max(100).allow(null, "").optional(),
  agency: Joi.string().max(10).allow(null, "").optional(),
  account: Joi.string().max(20).allow(null, "").optional(),
  account_type: Joi.string().max(20).allow(null, "").optional(),
  // Benefícios
  transportation_voucher: Joi.boolean().default(false).optional(),
  meal_voucher: Joi.number().min(0).precision(2).default(0).optional(),
  health_insurance: Joi.boolean().default(false).optional(),
  dental_insurance: Joi.boolean().default(false).optional(),
  // Dependentes
  dependents: Joi.number().integer().min(0).default(0).optional().messages({
    "number.min": "Número de dependentes não pode ser negativo"
  }),
  // Documentos
  ctps_numero: Joi.string().max(20).allow(null, "").optional(),
  ctps_serie: Joi.string().max(20).allow(null, "").optional(),
  ctps_uf: Joi.string().length(2).allow(null, "").optional(),
  pis_pasep: Joi.string().max(20).allow(null, "").optional(),
  titulo_eleitor: Joi.string().max(20).allow(null, "").optional(),
  notes: Joi.string().allow(null, "").optional()
});
function employeeIsValid(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message
      }));
      return res.status(400).json({
        success: false,
        message: "Erro de validação",
        errors
      });
    }
    next();
  };
}
const updateEmployeeSchema = addEmployeeSchema.fork(
  ["full_name", "cpf", "birth_date", "position_id", "hire_date", "current_salary"],
  (schema) => schema.optional()
);
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const status = req.query.status;
    const funcionarios = await employeeService.listarFuncionarios(status);
    res.json({
      success: true,
      data: funcionarios
    });
  } catch (error) {
    console.error("Erro ao listar funcionários:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao listar funcionários"
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const funcionario = await employeeService.buscarFuncionarioPorId(id);
    if (!funcionario) {
      return res.status(404).json({
        success: false,
        message: "Funcionário não encontrado"
      });
    }
    res.json({
      success: true,
      data: funcionario
    });
  } catch (error) {
    console.error("Erro ao buscar funcionário:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar funcionário"
    });
  }
});
router.post("/", employeeIsValid(addEmployeeSchema), async (req, res) => {
  try {
    const { full_name, cpf } = req.body;
    const existente = await employeeService.buscarFuncionarioPorCPF(cpf);
    if (existente) {
      return res.status(400).json({
        success: false,
        message: "CPF já cadastrado"
      });
    }
    const id = await employeeService.criarFuncionario(req.body);
    await logService.write({
      user_id: req.user?.id,
      who: req.user?.usuario || "Sistema",
      where: "Funcionários",
      what: `Cadastrou o funcionário: ${full_name}`
    });
    res.status(201).json({
      success: true,
      message: "Funcionário cadastrado com sucesso",
      data: { id }
    });
  } catch (error) {
    console.error("Erro ao criar funcionário:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao criar funcionário"
    });
  }
});
router.put("/:id", employeeIsValid(updateEmployeeSchema), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const funcionario = await employeeService.buscarFuncionarioPorId(id);
    if (!funcionario) {
      return res.status(404).json({
        success: false,
        message: "Funcionário não encontrado"
      });
    }
    const sucesso = await employeeService.atualizarFuncionario(id, req.body);
    if (sucesso) {
      await logService.write({
        user_id: req.user?.id,
        who: req.user?.usuario || "Sistema",
        where: "Funcionários",
        what: `Atualizou o funcionário: ${funcionario.full_name}`
      });
      res.json({
        success: true,
        message: "Funcionário atualizado com sucesso"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Nenhuma alteração realizada"
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar funcionário"
    });
  }
});
router.get("/:id/calcular", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const calculo = await employeeService.calcularFolhaPagamento(id);
    res.json({
      success: true,
      data: calculo
    });
  } catch (error) {
    console.error("Erro ao calcular folha:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Erro ao calcular folha"
    });
  }
});
router.get("/stats/geral", async (req, res) => {
  try {
    const stats = await employeeService.obterEstatisticas();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao obter estatísticas"
    });
  }
});
router.get("/relatorio/consolidado", async (req, res) => {
  try {
    const status = req.query.status;
    const funcionarios = await employeeService.listarFuncionarios(status);
    const relatorio = [];
    for (const func of funcionarios) {
      const calculo = await employeeService.calcularFolhaPagamento(func.id);
      relatorio.push({
        nome: func.full_name,
        cpf: func.cpf,
        cargo: func.position_name,
        status: func.status,
        salario_bruto: calculo.salarioBruto,
        inss: calculo.inss,
        irrf: calculo.irrf,
        transportation_voucher: calculo.valeTransporteDesc,
        total_descontos: calculo.totalDescontos,
        salario_liquido: calculo.salarioLiquido,
        encargos_patronais: calculo.totalEncargos,
        custo_total: calculo.custoTotal
      });
    }
    res.json({
      success: true,
      data: relatorio,
      totalizadores: {
        total_funcionarios: relatorio.length,
        total_salarios_brutos: relatorio.reduce((acc, f) => acc + f.salario_bruto, 0),
        total_descontos: relatorio.reduce((acc, f) => acc + f.total_descontos, 0),
        total_salarios_liquidos: relatorio.reduce((acc, f) => acc + f.salario_liquido, 0),
        total_encargos: relatorio.reduce((acc, f) => acc + f.encargos_patronais, 0),
        custo_total_empresa: relatorio.reduce((acc, f) => acc + f.custo_total, 0)
      }
    });
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao gerar relatório consolidado"
    });
  }
});
const route = express.Router();
route.get("/api/health", healthRoute);
route.post("/api/login", loginIsValid(loginSchema), loginRoute);
route.post("/api/users", authenticateToken, requirePermissions("users:create"), userIsValid(addUserSchema), addUserRoute);
route.get("/api/users", authenticateToken, requirePermissions("users:view"), listUsersRoute);
route.get("/api/users/:id", authenticateToken, requirePermissions("users:view"), getUserRoute);
route.put("/api/users/:id", authenticateToken, requirePermissions("users:update"), updateUserRoute);
route.post("/api/profiles", authenticateToken, requirePermissions("profiles:create"), profileIsValid(addProfileSchema), addProfileRoute);
route.get("/api/profiles", authenticateToken, requirePermissions("profiles:view"), listProfilesRoute);
route.get("/api/profiles/:id", authenticateToken, requirePermissions("profiles:view"), getProfileRoute);
route.put("/api/profiles/:id", authenticateToken, requirePermissions("profiles:update"), updateProfileRoute);
route.get("/api/allowed", authenticateToken, requirePermissions("permissions:view"), getAllowedRoute);
route.get("/api/logs", authenticateToken, requirePermissions("logs:view"), getLogsRoute);
route.use("/api/positions", authenticateToken, requirePermissions("positions:view"), router$1);
route.use("/api/employees", authenticateToken, requirePermissions("employees:view"), router);
dotenv.config();
const app = express();
const port = process.env.EXPRESS_PORT ?? 3e3;
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4040"],
  // Vite dev server e Electron
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);
app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
exports.default = app;
