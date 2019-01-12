$(document).ready(function () {

    var characters = [
        {
        name: "yoda",
        health: 180,
        attack: 2,
        counterAttak: 25,
    },
    {
        name: "darth-sidious",
        health: 150,
        attack: 4,
        counterAttak: 20
    },
    {
        name: "darth-vader",
        health: 120,
        attack: 6,
        counterAttak: 15,
    },
    {
        name: "luke",
        health: 100,
        attack: 8,
        counterAttak: 10,
    },
 ];

    var playerSelected = null;
    var enemySelected = null;
    var attacker = null;
    var defender = null;
    var remainingEnemies = 3;

    function initializeCharacters() {
        characters.map(item => {
            var name = item.name;
            $(`#${name} .health`).text(item.health);
        });
    };

    $(".character-available").on("click", function () {
        if (null == playerSelected) {

            playerSelected = $(this);

            characters.map(item => {
                if (playerSelected.attr("id") == item.name) {
                    attacker = item;
                };
            });
            console.log('attacker = ', attacker);

            
            playerSelected.removeClass("character-available").addClass("attacker");
            $(".character-available img").attr("id", "enemy-available");
            $("#enemies").append($(".character-available"));
        }
        else if (null == enemySelected) {

            enemySelected = $(this);

            characters.map(item => {
                if (enemySelected.attr("id") == item.name) {
                    defender = item;
                };
            });

            console.log('defender = ', defender);


            enemySelected.removeClass("character-available").addClass("defender");
            $("#defender").append($(enemySelected));
        }


    });

    $("#attack").on("click", function() {
        if (playerSelected && enemySelected) {

                defender.health = defender.health - attacker.attack;
                attacker.health -= defender.counterAttak;
                attacker.attack += attacker.attack;

                if (attacker.health < 0) {
                    $("#fighters").append("<h1> YOU LOST </h1").addClass("red");
                }
                else if (defender.health < 0)
                {
                    $(`#${defender.name}`).remove();
                    remainingEnemies--;
                    enemySelected = null;

                    if (remainingEnemies == 0) {
                        $("#enemies").append("<h1>  YOU WON!!!  </h1>").addClass("red");
                    }
                }
                $(`#${attacker.name} .health`).text(attacker.health);
                $(`#${defender.name} .health`).text(defender.health);
            

        }

    });

    $("#new-game").on("click", function() {
        location.reload();
    })


    initializeCharacters();

});

