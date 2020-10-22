const express = require('express');

const getCurrUser = function(req) {
  let user = undefined;
  if(req.session.currentUser) {
    user = req.session.currentUser;
  }
  return user;
}

module.exports = {getCurrUser};