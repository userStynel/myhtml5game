class StateMachine
    {
        constructor(initialState, possibleStates, stateArgs=[])
        {  
            this.initialState = initialState;
            this.possibleStates = possibleStates;
            this.stateArgs = stateArgs;
            this.state = null;
            for(const state of Object.values(this.possibleStates))
            {
                state.stateMachine = this;
            }
        }

        step()
        {
            if(this.state == null)
            {
                this.state = this.initialState;
                this.possibleStates[this.state].enter(this.stateArgs[0], this.stateArgs[1]);
            }
            this.possibleStates[this.state].execute(this.stateArgs[0], this.stateArgs[1]);
        }

        transistion(newState)
        {  
            this.state = newState;
            this.possibleStates[this.state].enter(this.stateArgs[0], this.stateArgs[1]);
        }

    }
    class State
    {
        enter(){}
        execute(){}
    }

    class IdleState extends State
    {
        enter(scene, hero)
        {
            hero.setVelocity(0);
        }
        execute(scene, hero)
        {
            if (scene.keys.A.isDown || scene.keys.D.isDown || scene.keys.W.isDown || scene.keys.S.isDown)
            {
                this.stateMachine.transistion('move');
                return;
            }
            if(scene.keys.SPACE.isDown)
            {
                this.stateMachine.transistion('swing');
                return;
            }
            hero.anims.play('idle-'+hero.direction, true);
        }
    }

    class MoveState extends State
    {
        execute(scene, hero)
        {
            if(scene.keys.SPACE.isDown)
            {
                this.stateMachine.transistion('swing');
                return;
            }
            if(!scene.keys.A.isDown && !scene.keys.D.isDown && !scene.keys.W.isDown && !scene.keys.S.isDown)
            {
                this.stateMachine.transistion('idle');
                return;
            }
            if(scene.keys.A.isDown)
            {
                hero.setVelocityX(-100);
                //hero.direction = "left"
            }
            if(scene.keys.D.isDown)
            {
                hero.setVelocityX(100);
                //hero.direction = "right"
                hero.anims.play('walking-right', true);
                return;
            }
            if(scene.keys.W.isDown)
            {
                hero.setVelocityY(-300);
                hero.direction = "up";
                hero.anims.play('walking-'+hero.direction, true);
                return;
            }
            if(scene.keys.S.isDown)
            {
                hero.setVelocityY(300);
                hero.direction = "down";
                hero.anims.play('walking-'+hero.direction, true);
                return;
            }
           hero.anims.play('idle-'+hero.direction, true);
        }
    }

    class SwingState extends State
    {
        enter(scene, hero)
        {
            hero.setVelocityX(0);
            hero.anims.play('attack_'+hero.direction);
            hero.once('animationcomplete', () => {this.stateMachine.transistion('idle');});
        }
    }