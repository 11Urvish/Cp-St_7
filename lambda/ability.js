const { AbilityBuilder, Ability  } = require('@casl/ability');

function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);
    if (user && user.role === 'SuperAdmin' || user && user.role === 'Super Admin') { 
        can('manage', 'all');
    } else if (user && user.role === 'Admin') {
        can('read', 'Area');
        can('read', 'lambda');
    }
    return build();
}

module.exports = defineAbilityFor;