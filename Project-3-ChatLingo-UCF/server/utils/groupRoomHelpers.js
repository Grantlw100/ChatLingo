async function addUserToGroup({ userId, groupId }) {
    let userToAdd = await User.findById(userId);
    let group = await Group.findById(groupId, function(err, group) {
      if (err) {
        console.log(err);
      }
    });
    group.users.push(userToAdd);
    group.save();
    return group;
  }
  
  async function removeUserFromGroup({ userId, groupId }) {
    let group = await Group.findById(groupId).then((group) => {
            group.users.pull(userId);
            group.save();
        })
        .catch((err) => {
            console.log(err);
        });
    return group;
  }

    module.exports = {
    addUserToGroup,
    removeUserFromGroup,  
    };
  