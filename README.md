T3
==

Very simple Tic Tac Toe implementation in JavaScript

TODO
==

Now
===

Add a restart method to the model that sets the current player to be a random player.

In the ready function in the controller have it call restart before update. In Model initialize currentPlayer to null. Check that the program now starts with a random player.

In the ready function in the controller have it restart the model and update the view when restart is clicked. You'll need to look at jQuery's docs to figure out how to do this. Check that clicking restart changes the current player.

In the model create a board property. In restart initialize each square to be random player for now. In View's update method write the code to draw the board. Check that this works.

In the model create a move method that given a cell x, y sets that cell to be owned by the current player and sets currentPlayer to be the other player.

In the view's click method have it call Model's move method with the correct cell and redraw itself. Check that you can click to take squares.

Now change Model.restart to initialize all squares to null. Check that your program still works and now the board starts out empty and you can take squares one by one.

Make it impossible to take a square that is already taken. Check that this works.

Add a getWinner method in the model. Have it return either the current winner or null if nobody has won yet. Have the view reflect the winner in the status line. Check that this works.

Have the status read 'Statemate!' if nobody can move.

Make it impossible to move once you have a winner. Check that this works. You should now have a wokring Tic-Tac-Toe implementation.


Cleanup
===

extract constants

DRY

use _.js

breakdown methods

Be Defensive


Long Term
===

make squares objects

have rollover effect

highlight solution

encapsulate writes

auto update view on change

make restart turn blue on end

move mouse commands to the controller

pretty up html

have n players

have configurable board size & winner length

animate rollover

animate solution highlight

have AI

allow play over net

auto match players

implement T4

switch to easel.js

switch to CoffeeScript

switch to HAML

switch to scss

upload to S3 with s3 sync

set headers correctly

Get a domain name

use route 53

Put google page speed service infront, add expire to upload script