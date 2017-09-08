const Realm = require("realm");

const ADMIN_TOKEN = require("./data/keys/admin.json").ADMIN_TOKEN;

const user = Realm.Sync.User.adminUser(ADMIN_TOKEN, "http://localhost:9080");

const timeout = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Timed out");
    }, delay);
  });
}

const realm = Realm.open({
  sync: {
    url: "realm://localhost:9080/__admin",
    user,
  }
});

Promise.race([realm, timeout(5000)])
.then((realm) => {
  console.log(`Yay! The test passed!`, realm);
  process.exit(0);
}, (err) => {
  console.error(`Test failed: ${err}`);
  process.exit(1);
});
