import { Component } from "../dungineLib/componentManager.js";
import { DungineEntity } from "../dungineLib/dungineEntity.js";
import { Vec2d } from "../dungineLib/vec2d.js";

export let AiMovement = <Component>{
    init(entity, dt, args) {
        entity.assertProperty(entity.properties.AiMovementGoals?.length, "number", `Error initialising AiMovement for ${entity.type.name}: entity.properties.AiMovementGoals is not specified. Example: [{'type':'player', minDist: 100, maxDist 150, weight: 1}, ...]`)
        entity.assertProperty(entity.properties.AiMoveSpeed, "number", `Error initialising AiMovement for ${entity.type.name}: entity.properties.AiMoveSpeed is not defined or not a number. Be sure to initialise this value in the entity type's constructor function.`)
    },
    tick(entity, dt, args) {
        let goals = <{type: string, minDist: number, maxDist: number, weight: number}[]> entity.properties.AiMovementGoals;
        let fullGoalDirection = new Vec2d(0, 0);
        for (const goal of goals) {
            let closestEntity: DungineEntity;
            let closestDist = Infinity;
            for (const other of entity.room.entities) {
                if (other == entity) continue;
                if (other.type.name != goal.type) continue;
                let dist = entity.pos.dist(other.pos);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestEntity = other;
                }
            }
            if (closestEntity) {
                let goalDirection = closestEntity.pos.copy().sub(entity.pos).setMag(goal.weight)
                if (closestDist < goal.minDist) {
                    fullGoalDirection.sub(goalDirection);
                } else if (closestDist > goal.maxDist) {
                    fullGoalDirection.add(goalDirection);
                }
            }
        }

        if (fullGoalDirection.mag() > 0) {
            entity.vel.add(fullGoalDirection.setMag(entity.properties.AiMoveSpeed));
        }
    },
}

export let drawCircle = <Component>{
    init(entity, dt, args) {
        entity.setDefaultProperty("drawCircleColor", "black");
        entity.setDefaultProperty("drawCircleRotation", 0);
        entity.setDefaultProperty("drawCircleArcSize", Math.PI*2);
    },
    draw(entity, dt, args) {
        let ctx = args.canvas.ctx;
        ctx.fillStyle = entity.properties.drawCircleColor;
        ctx.beginPath();
        ctx.arc(entity.pos.x, entity.pos.y, entity.radius, entity.properties.drawCircleRotation, entity.properties.drawCircleRotation + entity.properties.drawCircleArcSize);
        ctx.fill();
    },
}

export let explosion = <Component>{
    import(dungine) {
        dungine.typeManager.addType("explosion", true, Infinity, 0, ["explosion"], (entity, args) => {
            entity.properties.explosionDelay = args.explosionDelay;
            entity.radius = args.explosionRadius;
            entity.properties.explosionDamage = args.explosionDamage
        })
    },
    init(entity, dt, args) {
        entity.setDefaultProperty("explosionDelay", 0);
    },
    tick(entity, dt, args) {
        let timeLeft = (entity.properties.explosionDelay - entity.age);

        if (timeLeft > 0) {
            entity.room.particleManager.spawnParticles(
                {
                    shape: "circle",
                    size: entity.radius*2,
                    outwardVel: -entity.radius / timeLeft,
                    randomVel: 0,
                    particleCount: 3,
                    particleTypes: [{
                        red: 255,
                        green: 100,
                        blue: 0,
                        opacity: 0.5,
                        size: entity.radius*Math.PI*2/50,
                        fadeStart: timeLeft*0.5,
                        fadeEnd: timeLeft,
                    }]
                },
                entity.pos
            );
        } else {
            entity.health = -Infinity;
            entity.room.particleManager.spawnParticles(
                {
                    shape: "circle",
                    size: entity.radius, // the diameter of the particles spawn will be half the diameter of the explosion
                    outwardVel: entity.radius*4,
                    randomVel: entity.radius/10,
                    particleCount: 50,
                    particleTypes: [{
                        red: 255,
                        green: 100,
                        blue: 0,
                        opacity: 0.5,
                        size: entity.radius/5,
                        fadeStart: 0.5,
                        fadeEnd: 1,
                    }]
                },
                entity.pos
            );
        }
    },
    collission(entity, dt, args) {
        let timeLeft = (entity.properties.explosionDelay - entity.age);
        
        if (timeLeft > 0) return
        
        args.other.health -= entity.properties.explosionDamage

        if (!args.other.isStatic) {
            args.other.vel.add(args.relPos.copy().setMag(500));
        }
    },

}

export let friction = <Component>{
    init(entity, dt, args) {
        entity.setDefaultProperty("frictionFactor", 0.9);
    },
    tick(entity, dt, args) {
        entity.vel.mult(entity.properties.frictionFactor);
    },
}

export let healthBar = <Component>{
    init(entity, dt, args) {
        entity.setDefaultProperty("healthBarMax", entity.health);
        entity.setDefaultProperty("healthBarSize", undefined);
        entity.setDefaultProperty("healthBarWidth", 10);
        entity.setDefaultProperty("healthBarFrontColor", "red");
        entity.setDefaultProperty("healthBarBackColor", "black");
    },
    draw(entity, dt, args) {
        let radius = entity.properties.healthBarSize/2 || entity.radius;
        let width = entity.properties.healthBarWidth;
        let ctx = args.canvas.ctx;
        ctx.save();
            ctx.lineCap = "round"
            ctx.lineWidth = width;
            ctx.strokeStyle = entity.properties.healthBarBackColor;
            ctx.beginPath();
            ctx.moveTo(entity.pos.x - radius, entity.pos.y + entity.radius + width);
            ctx.lineTo(entity.pos.x + radius, entity.pos.y + entity.radius + width);
            ctx.stroke();
            ctx.lineWidth = width*0.5;
            ctx.strokeStyle = entity.properties.healthBarFrontColor;
            ctx.beginPath();
            ctx.moveTo(entity.pos.x - radius, entity.pos.y + entity.radius + width);
            ctx.lineTo(entity.pos.x - radius + radius*2*(entity.health/entity.properties.healthBarMax), entity.pos.y + entity.radius + width);
            ctx.stroke();
        ctx.restore();
    },
}

export let playerMovement = <Component>{
    init(entity, dt, args) {
        entity.assertProperty(entity.properties.playerMoveSpeed, "number", `Error initialising playerMovement for ${entity.type.name} Entity: entity.properties.playerMoveSpeed is not defined or not a number. Be sure to initialise this value in the entity type's constructor function.`)
    },
    tick(entity, dt, args) {
        const MOVE_SPEED = entity.properties.playerMoveSpeed;
    
        if (entity.dungine.controls.heldCodes.has("KeyA")) entity.vel.addXY(-MOVE_SPEED,0);
        if (entity.dungine.controls.heldCodes.has("KeyD")) entity.vel.addXY(MOVE_SPEED,0);
        if (entity.dungine.controls.heldCodes.has("KeyW")) entity.vel.addXY(0,-MOVE_SPEED);
        if (entity.dungine.controls.heldCodes.has("KeyS")) entity.vel.addXY(0,MOVE_SPEED);
    },
}

export let projectileWeapon = <Component> {
    import(dungine) {
        dungine.typeManager.componentManager.addComponent("projectileWeaponProjectile", <Component> {
            init(entity, dt, args) {
                entity.assertProperty(entity.properties.damage, "number", `Error in projectileWeaponProjectile for ${entity.type.name}: entity.properties.damage is not defined.`);
                entity.assertProperty(entity.radius, "number", `Error in projectileWeaponProjectile for ${entity.type.name}: entity.radius is not defined.`);
                entity.assertProperty(entity.properties.owner, "object", `Error in projectileWeaponProjectile for ${entity.type.name}: entity.properties.owner is not defined.`);
                entity.assertProperty(entity.properties.damageWhitelist, "object", `Error in projectileWeaponProjectile for ${entity.type.name}: entity.properties.damageWhitelist is not defined.`)
            },
            roomWallCollission(entity, dt, args) {
                entity.health = -Infinity;
            },
            collission(entity, dt, args) {
                let other = args.other;
                if (other == entity.properties.owner || other.type.name == "projectileWeaponProjectile") return;
                if (entity.properties.damageWhitelist?.length && !entity.properties.damageWhitelist.includes(other.type.name)) return
                other.health -= entity.properties.damage;
                entity.health = -Infinity;
            },
        });
        dungine.typeManager.addType("projectileWeaponProjectile", false, Infinity, 0, ["projectileWeaponProjectile", "drawCircle"], (entity, args) => {
            entity.properties.damage = args.damage;
            entity.radius = args.radius
            entity.properties.owner = args.owner;
            entity.properties.drawCircleColor = args.color;
            entity.properties.damageWhitelist = args.damageWhitelist
        });
    },
    init(entity, dt, args) {
        entity.properties.projectileWeaponTrigger = true;
        entity.properties.projectileWeaponCooldownTimer = 0;
        entity.setDefaultProperty("projectileWeaponCooldown", 0.2);
        entity.setDefaultProperty("projectileWeaponAim", new Vec2d(1,0).rotate(Math.random()*Math.PI*2));
        entity.assertProperty(entity.properties.projectileWeaponProjectileDamage, "number", `Error in projectileWeapon for ${entity.type.name}: entity.properties.projectileWeaponProjectileDamage is not defined or not a number.`);
        entity.assertProperty(entity.properties.projectileWeaponProjectileRadius, "number", `Error in projectileWeapon for ${entity.type.name}: entity.properties.projectileWeaponProjectileRadius is not defined or not a number.`);
        entity.setDefaultProperty("projectileWeaponProjectileColor", "black");
        entity.setDefaultProperty("projectileWeaponDamageWhitelist", []);
        entity.setDefaultProperty("projectileWeaponProjectileSpeed", 200);
    },
    tick(entity, dt, args) {
        const props = entity.properties;

        props.projectileWeaponCooldownTimer -= dt;

        if (props.projectileWeaponTriggerKeyCode) {
            props.projectileWeaponTrigger = entity.dungine.controls.heldCodes.has(props.projectileWeaponTriggerKeyCode);
        }

        props.projectileWeaponAim.normalize();

        if (props.projectileWeaponAimTo === "random") {
            props.projectileWeaponAim.rotate(Math.random()*2*Math.PI);
        } else if (props.projectileWeaponAimTo === "mouse") {
            props.projectileWeaponAim.set(entity.dungine.controls.mousePos.copy().sub(entity.pos).normalize());
        } else if (typeof props.projectileWeaponAimTo == "object") { // array of strings
            let closestEntity: DungineEntity | undefined;
            let closestDist = Infinity;
            for (const other of entity.room.entities) {
                if (props.projectileWeaponAimTo.includes(other.type.name) && entity.pos.dist(other.pos) < closestDist) {
                    closestEntity = other;
                    closestDist = entity.pos.dist(other.pos);
                }
            }
            if (closestEntity) {
               props.projectileWeaponAim.set(closestEntity.pos.copy().sub(entity.pos).normalize());
               props.projectileWeaponTrigger = true;
            } else {
               props.projectileWeaponTrigger = false;
            }
        }

        if (props.projectileWeaponTrigger && entity.properties.projectileWeaponCooldownTimer < 0) {
            props.projectileWeaponCooldownTimer = props.projectileWeaponCooldown;
            entity.room.summon("projectileWeaponProjectile", entity.pos.copy(), props.projectileWeaponAim.copy().mult(200), {
                damage: entity.properties.projectileWeaponProjectileDamage,
                radius: entity.properties.projectileWeaponProjectileRadius,
                owner: entity,
                color: entity.properties.projectileWeaponProjectileColor,
                damageWhitelist: entity.properties.projectileWeaponDamageWhitelist
            });
        }
    },
}

export let push = <Component> {
    init(entity, dt, args) {
        entity.setDefaultProperty("pushWeight", 1);
    },
    collission(entity, dt, args) {
        if (!args.other.type.componentNameSet.has("push")) return;
        let moveDist = args.edgeDist;
        let relVel = args.other.vel.copy().sub(entity.vel);
        let approachAmount = -args.relPos.copy().normalize().dot(relVel);
        let repelVec = args.relPos.copy().setMag(approachAmount);
        console.log(approachAmount, relVel.mag());
        let weightpart = args.other.properties.pushWeight / (args.other.properties.pushWeight + entity.properties.pushWeight); // the % (0 to 1) of weight of the collision that is from this entity.
        if (args.other.isStatic) {
            weightpart = 1;
        }
        moveDist *= 1-weightpart;
        entity.pos.add(args.relPos.copy().setMag(moveDist));
        if (approachAmount > 0) {
            entity.vel.add(repelVec.mult(-weightpart));
        }
    },
}