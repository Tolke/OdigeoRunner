game.PlayerEntity = me.ObjectEntity.extend({

    // constructor

    init: function (x, y, settings) {
        settings.spritewidth = 50;
		settings.spriteheight = 92;
        settings.gravity = 0;
        this.parent(x, y, settings);
        this.isCollidable = true;
        // set velocity horziontantl & vertical
        this.setVelocity(5, 8);

        // init variables
        this.gravity = 0;
        this.alwaysUpdate = true;

        //// set the display to follow our position on y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    /* -----
    update the player pos
    ------ */

    update: function () {
        if (me.input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            //this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            //this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = -this.accel.y * me.timer.tick;
        }
        this.vel.y = -this.accel.y * me.timer.tick;

        // check & update player movement
        this.updateMovement();

        // check for collision
        var res = me.game.world.collide(this);

        if (res == null) {
            // if we collide with an enemy
			if (res == null) {res = {}; res.obj = {}; res.obj.type = {};}
            if (res.obj.type == me.game.ACTION_OBJECT) {
                // resetear
            }
        }

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
	
	onCollision: function (res, obj) {

        console.log('res', res, 'obj', obj);
    },

});

/* --------------------------
an enemy Entity
------------------------ */
/*
game.EnemyEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        // define this here instead of tiled
        settings.image = "wheelie_right";
        settings.spritewidth = 64;

        // call the parent constructor
        this.parent(x, y, settings);

        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        // walking & jumping speed
        this.setVelocity(4, 6);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function (res, obj) {

        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.renderable.flicker(45);
        }
    },

    // manage the enemy movement
    update: function () {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

        } else {
            this.vel.x = 0;
        }

        // check and update movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});
*/

/*----------------
 a Coin entity
------------------------ */
/*
game.CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function () {
        // do something when collected

        // give some score
        game.data.score += 250;

        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }

});
*/