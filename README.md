# Breakout_Game
This game created for my web-based programming class assignment.
You can play the game on this link :
http://breakout.orgfree.com/index.html#

## Main
Firstly I add screen to index.html.

But i used screen resolution rather than pixel size so in that way you can play this game on mobile without any pixel lose.

Then update stylesheet to include the new screen.

Update startGame function with logic that closes new screen when the game starts.

Then create a new gameOver function that displays in our new screen. It will also hide all other screens.

Also we update our bricks class with a new function that checks if there are no bricks left.
Bytheway bricks might looks pretty default. But actually you can dynamically change number of row and column. 

For ball movement i work on screen and paddle perimeter. If our ball hits our screens left, up or right sides it has to move directly on flat refractive curve. In that way ball wont change any degree.
If ball falls down or a bug may occur and our ball gets too far from our screen, it just despawn on his spawnpoint aka. middle of the screen.
If ball hits our paddle as might be expected i did not calculate the rate of arrival of the paddle. the ball's direction and velocity at the end of the collision are not affected by the velocity of the paddle. But it affected by the impact point on the paddle. So if our ball hits the leftside of the paddle it goes left, if hits the rightside of the paddle it goes right side.

In our main move function, we'll check to see if the brick count is zero, if it is, then we'll show the gameOver screen.So when the bricks are gone, the game ends.

Also there is two variables for checking point and checking life. 

On this style i created 3 gamemode.

![ht1](https://user-images.githubusercontent.com/72496488/167949479-ab0022cd-1369-4f07-80bc-dcd8b8de01ab.PNG)


## No Death Mode 
In this mode there is no life so there is no end for the play. If your ball falls it just despawn. As long as you break all the bricks game just ends and shows your points. You can restart but your points wont reset.
![ht2](https://user-images.githubusercontent.com/72496488/167949925-ca4d2b62-08cf-4141-a89b-657a2f046d05.PNG)

## Normal Mode 
In this mode there is 5 life. If your ball falls to the ground you will lose one of your life. If all ends game will reset all bricks and paddle. After that it will show your point if you restart on there you will start with 5 life but your point will reset.
![ht3](https://user-images.githubusercontent.com/72496488/167950431-cd65eff5-12bc-4618-b69e-9b9acc98cc57.PNG)

## Fun Mode 
This mode is actually no death mode. But with one difference. There is no more restraint on your paddle, you can carry him on y axis too. For do that basically i used x axis movement algorithm on y axis too.

![ht4](https://user-images.githubusercontent.com/72496488/167950980-7418f4e8-5c95-42e3-b163-fa1d9ae00fef.PNG)

And that is it. Dont forget to play the game on the link cya :D

