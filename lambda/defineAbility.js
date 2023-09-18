const { AbilityBuilder, Ability } = require('@casl/ability');

class defineAbility {
    constructor() {
        this.ability = new Ability([]);
    }

    updateAbility(user) {
        const { can, rules } = AbilityBuilder.extract();

        console.log('user', user);

        if (user && user.userType === 'super_admin') {
            can('manage', 'all');
        } else if (user && user.userType === 'admin') {
            can('read', 'all');
        } 

        this.ability.update(rules);
    }

    can(user, action, subject) {
        // this.updateAbility(user);
        console.log('user', user);
        console.log('action', action);
        console.log('subject', subject);

        return this.ability.can(action, subject);
    }
}

module.exports = new defineAbility();