import { Dungine } from "./dungineLib/dungine.js";
import { Vec2d } from "./dungineLib/vec2d.js";

window.addEventListener("load", async () => {
    let dungine = new Dungine();

    await dungine.typeManager.componentManager.importComponentFiles([
        "../components/dungineComponents.js",
    ]);

    dungine.typeManager.addType("player", false, 100, 20, ["drawCircle", "playerMovement", "projectileWeapon", "healthBar", "push", "friction"], (entity)=>{
        entity.properties.playerMoveSpeed = 50;
        entity.properties.projectileWeaponTriggerKeyCode = "Mouse0";
        entity.properties.projectileWeaponAimTo = "mouse";
        entity.properties.drawCircleColor = "green";
        entity.properties.projectileWeaponProjectileDamage = 5;
        entity.properties.projectileWeaponProjectileRadius = 5;
    });

    dungine.typeManager.addType("enemy", false, 100, 20, ["drawCircle", "healthBar", "projectileWeapon", "AiMovement", "push", "friction"], (entity) => {
        entity.properties.drawCircleColor = "red";
        entity.properties.projectileWeaponAimTo = ["player"];
        entity.properties.AiMovementGoals = [{type: "player", minDist: 100, maxDist: 0, weight: 1}];
        entity.properties.AiMoveSpeed = 10;
        entity.properties.projectileWeaponProjectileDamage = 2;
        entity.properties.projectileWeaponProjectileRadius = 2;
    });

    dungine.currentRoom.summon("player", new Vec2d(100, 100), new Vec2d(0, 0), {});

    dungine.currentRoom.summon("enemy", new Vec2d(300, 300), new Vec2d(0, 0), {});

    setInterval(() => {
        dungine.currentRoom.particleManager.createParticlesCircle(
            Vec2d.randBox(dungine.currentRoom.size.x, dungine.currentRoom.size.y),
            50,
            0,
            10,
            100,
            {
                red: 255,
                green: 0,
                blue: 0,
                opacity: 1,
                size: 10,
                fadeStart: 1,
                fadeEnd: 2,
            }
        )
        dungine.currentRoom.particleManager.createParticlesSquare(
            Vec2d.randBox(dungine.currentRoom.size.x, dungine.currentRoom.size.y),
            10,
            Math.random()*Math.PI,
            100,
            0,
            100,
            {
                red: 0,
                green: 255,
                blue: 0,
                opacity: 1,
                size: 10,
                fadeStart: 1,
                fadeEnd: 2,
            }
        )
        dungine.currentRoom.particleManager.createParticlesLine(
            Vec2d.randBox(dungine.currentRoom.size.x, dungine.currentRoom.size.y),
            100,
            Math.random()*Math.PI,
            -50,
            10,
            100,
            {
                red: 0,
                green: 0,
                blue: 255,
                opacity: 1,
                size: 10,
                fadeStart: 0,
                fadeEnd: 1,
            }
        )
    }, 1000)

    dungine.start();
})