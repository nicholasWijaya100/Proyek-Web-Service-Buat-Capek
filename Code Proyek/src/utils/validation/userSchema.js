const Joi = require("joi");

// pengguna_username is required

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(6)
    .max(30)
    .required()
    .label("Nama Pengguna")
    .messages({
      "any.required": "{{#label}} All fields are required to be filled",
      "string.alphanum": "{{#label}} The username must only contain alphanumeric characters (numbers and letters)",
      "string.min": "{{#label}} Username must have more than 6 characters",
      "string.max": "{{#label}} Username must not have more than 30 characters",
    }),
  pengguna_email: Joi.string()
    .email({ tlds: { allow: ["edu", "com"] } })
    .required()
    .label("Email Pengguna")
    .messages({
      "any.required": "{{#label}} email harus diisi",
      "string.email":
        "{{#label}} harus dalam format email dan tlds nya adalah .com / .edu",
    }),
  pengguna_password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .label("Password Pengguna")
    .messages({
      "string.pattern.base":
        "{{#label}} harus diisi dengan minimal 1 huruf kecil, 1 huruf besar, 1 angka dan 1 simbol, dengan panjang minimal 8 karakter",
    }),
  pengguna_konfirmasi_password: Joi.any()
    .equal(Joi.ref("pengguna_password"))
    .label("Konfirmasi Password")
    .messages({ "any.only": "{{#label}} harus sama dengan password" }),
});
