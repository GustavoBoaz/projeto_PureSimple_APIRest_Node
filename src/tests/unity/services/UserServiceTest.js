const assert = require('node:assert/strict');
const UserService = require('../../../app/services/UserService')

/**
 * Teste saveUser
 */
UserService.saveUser({ firstName: "first5", lastName: "last5", email: "abc@gmail.com" });
assert.equal(UserService.getUsers().length, 5)

/**
 * Teste getUsers
 */
const list = UserService.getUsers();
assert.equal(list.length, 5)

/**
 * Teste replaceUser
 */
UserService.replaceUser(5, { firstName: "first5ALTERADO", lastName: "last5ALTERADO", email: "abc@gmail.com" });
const result = UserService.getUsers().filter((usr) => usr.id == 5)
assert.match(result[0].firstName, /first5ALTERADO/)

/**
 * Teste deleteUser
 */
UserService.deleteUser(5);
assert.equal(UserService.getUsers().length, 4)
