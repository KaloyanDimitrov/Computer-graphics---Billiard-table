//Pool table
//Lab3 and Lab 4 For Computer Graphics 
//17.01.2016 Made by Kaloyan Dimitrov

// Initialize webGL with camera and lights
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');
renderer.shadowMap.enabled = true;
renderer.shadowMap.soft = false;

// create scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight,0.1, 1000);
camera.position.x = 15;


var ambientLight = new THREE.AmbientLight(0x808080);
scene.add(ambientLight);


scene.rotation.x = Math.PI/2;
scene.rotation.y = Math.PI/2;

//make a light bulb
var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
var lightBulb = new THREE.Mesh( geometry, material );
scene.add( lightBulb );
lightBulb.position.x = 15;
lightBulb.position.z = 15;

//spotlight
var spotLight = new THREE.SpotLight( 0xffffff);
spotLight.position.set( 0, 15, 15  );

spotLight.castShadow = true;

spotLight.shadowCameraNear = 0.5;
spotLight.shadowCameraFar = 2000;
spotLight.shadowCameraFov = 90;

spotLight.shadowCameraVisible = false; //show shadow frustum 

scene.add( spotLight );



//Construction of table

var sizeOfTable = 20;
var lengthOfLegs = 7;
var sizeOfLegs = 1.5;
var tableThick = 1;
var sizeOfCushions = 1; //size in x or y
var cushionsThick = tableThick + 1;	//size in z
var numOfBalls = 8; //number of balls
var ballRadius = 0.5;
var speed = new Array(numOfBalls);

var geometry = new THREE.BoxGeometry( sizeOfTable, sizeOfTable/2, tableThick );
var material = new THREE.MeshPhongMaterial( {color: 0x00cc22, wireframe:false} );
var tableCenter = new THREE.Mesh( geometry, material );
scene.add( tableCenter );
//tableCenter.castShadow = true;
tableCenter.receiveShadow = true;

var geometry = new THREE.PlaneGeometry( 50, 50, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0x113355, side: THREE.DoubleSide} );
var ground = new THREE.Mesh( geometry, material );
scene.add( ground );
ground.position.z = -lengthOfLegs - tableThick/2 - 0.01; //0.01 to remove the glitching when the plane is inside of the leg
ground.receiveShadow = false;


//adding the legs
//formula for position is x = sizeOfTable/2 - sizeOfLegs/2 so that the edges of the table and leg align
//and since the y of the table is x/2, position for legs is 
//y = sizeOfTable/4 (e.g half of x) - sizeOfLegs/2 to align leg with edge of table again
//we have x and y and the four variations of them go to the different corners of the table
//-x -y ; -x y; x -y ; x y 

var geometry = new THREE.BoxGeometry( sizeOfLegs, sizeOfLegs, lengthOfLegs );
var material = new THREE.MeshPhongMaterial( {color: 0x001122, wireframe:false} );
var leg1 = new THREE.Mesh( geometry, material );
scene.add( leg1 );
leg1.position.x = sizeOfTable/2 - sizeOfLegs/2;
leg1.position.y = sizeOfTable/4 - sizeOfLegs/2;
leg1.position.z = -lengthOfLegs/2 - tableThick/2;

var geometry = new THREE.BoxGeometry( sizeOfLegs, sizeOfLegs, lengthOfLegs );
var material = new THREE.MeshPhongMaterial( {color: 0x001122, wireframe:false} );
var leg2 = new THREE.Mesh( geometry, material );
scene.add( leg2 );
leg2.position.x = -(sizeOfTable/2 - sizeOfLegs/2);
leg2.position.y = sizeOfTable/4 - sizeOfLegs/2;
leg2.position.z = -lengthOfLegs/2 - tableThick/2;

var geometry = new THREE.BoxGeometry( sizeOfLegs, sizeOfLegs, lengthOfLegs );
var material = new THREE.MeshPhongMaterial( {color: 0x001122, wireframe:false} );
var leg3 = new THREE.Mesh( geometry, material );
scene.add( leg3 );
leg3.position.x = -(sizeOfTable/2 - sizeOfLegs/2);
leg3.position.y = -(sizeOfTable/4 - sizeOfLegs/2);
leg3.position.z = -lengthOfLegs/2 - tableThick/2;

var geometry = new THREE.BoxGeometry( sizeOfLegs, sizeOfLegs, lengthOfLegs );
var material = new THREE.MeshPhongMaterial( {color: 0x001122, wireframe:false} );
var leg4 = new THREE.Mesh( geometry, material );
scene.add( leg4 );
leg4.position.x = sizeOfTable/2 - sizeOfLegs/2;
leg4.position.y = -(sizeOfTable/4 - sizeOfLegs/2);
leg4.position.z = -lengthOfLegs/2 - tableThick/2;

//adding cushions

//there are 4 cushions 
//2 are long moved in the y plane
//2 are short moved in the x plane
//all 4 are moved in z to match the centerTable mesh

var geometry = new THREE.BoxGeometry( sizeOfTable + sizeOfCushions*2, sizeOfCushions, cushionsThick );
var material = new THREE.MeshPhongMaterial( {color: 0xa52a2a, wireframe:false} );
var tableCushion1 = new THREE.Mesh( geometry, material );
scene.add( tableCushion1 );
tableCushion1.position.y = sizeOfTable/4 + sizeOfCushions/2;
tableCushion1.position.z = (cushionsThick-tableThick)/2;
tableCushion1.receiveShadow = false;

var geometry = new THREE.BoxGeometry( sizeOfTable + sizeOfCushions*2, sizeOfCushions, cushionsThick );
var material = new THREE.MeshPhongMaterial( {color: 0xa52a2a, wireframe:false} );
var tableCushion2 = new THREE.Mesh( geometry, material );
scene.add( tableCushion2 );
tableCushion2.position.y = -(sizeOfTable/4 + sizeOfCushions/2);
tableCushion2.position.z = (cushionsThick-tableThick)/2;
tableCushion2.receiveShadow = false;


var geometry = new THREE.BoxGeometry( sizeOfCushions, sizeOfTable/2, cushionsThick );
var material = new THREE.MeshPhongMaterial( {color: 0xa52a2a, wireframe:false} );
var tableCushion3 = new THREE.Mesh( geometry, material );
scene.add( tableCushion3 );
tableCushion3.position.x = sizeOfTable/2 + sizeOfCushions/2;
tableCushion3.position.z = (cushionsThick-tableThick)/2;
tableCushion3.receiveShadow = false;


var geometry = new THREE.BoxGeometry( sizeOfCushions, sizeOfTable/2, cushionsThick );
var material = new THREE.MeshPhongMaterial( {color: 0xa52a2a, wireframe:false} );
var tableCushion4 = new THREE.Mesh( geometry, material );
scene.add( tableCushion4 );
tableCushion4.position.x = -(sizeOfTable/2 + sizeOfCushions/2);
tableCushion4.position.z = (cushionsThick-tableThick)/2;
tableCushion4.receiveShadow = false;

//adding balls


generateBalls(tableCenter);

function generateBalls(parent){ 	//passing the object that will be the parent to the balls
	if(numOfBalls < 1) return;  //if number is negative or zero leave, in case program is made to get user input
	for(var i = 0; i < numOfBalls ; i++){
		var ballTexture = THREE.ImageUtils.loadTexture("Ball" + (i+8)+ ".jpg");
		//var colorball = (Math.random()*1000000000) % 16777215; //generating random number between 0 and 0xFFFFFF
		var geometry = new THREE.SphereGeometry( ballRadius, 10, 10 );
		var material = new THREE.MeshPhongMaterial( {color: 0xffffff,wireframe:false, map:ballTexture} );
		var ball = new THREE.Mesh( geometry, material );
		ball.matrixAutoUpdate = false;
		generateBallPosition(ball);
		speed[i] = generateBallSpeed();
		parent.add(ball);
		ball.castShadow = true;
		
	}
}

function generateBallPosition(ball){
		var margin = 0.3;
		ball.position.x = ((Math.random()-0.5)*100)%(sizeOfTable/2 - ballRadius);
		ball.position.y = ((Math.random()-0.5)*100)%(sizeOfTable/4 - ballRadius);
		ball.position.z = tableThick;
		for(var i = 0; i<tableCenter.children.length;i++){ //check for collision with any of the other balls starting spots
			if(ball.position.distanceTo(tableCenter.children[i].position) < ballRadius*2 + margin)
						generateBallPosition(ball);	//generate new spot if collision is detected
		}
}

function generateBallSpeed(){
	return new THREE.Vector3((Math.random()-0.5 )*6,(Math.random()-0.5 )*6,0); //return vector speed
}
var computerClock = new THREE.Clock(); //clock



// Render loop
var controls = new THREE.TrackballControls( camera, canvas );
controls.rotateSpeed = 5;


//implementing elastic collision
function detectCollision(ball, ID){
	for(var i = 0; i < tableCenter.children.length ; i++){
		if(i == ID) continue; //skip checking the ball against itself for collision
		if(ball.position.distanceTo(tableCenter.children[i].position) < ballRadius*2) //collision detected
		{				//collision code
			//alert("Collision");
			var d = new THREE.Vector3(0,0,0);
			d.x = ball.position.x - tableCenter.children[i].position.x;
			d.y = ball.position.y - tableCenter.children[i].position.y;
			
			oldSpeedID = speed[ID].clone();
			oldSpeedI = speed[i].clone();
			dotProd = d.clone().dot(oldSpeedID.sub(oldSpeedI)) / Math.pow(d.length(),2);
			summand = d.multiplyScalar(dotProd);
			
			speed[ID] = speed[ID].sub(summand);
			speed[i] = speed[i].add(summand);
			
			speed[ID].multiplyScalar(0.7); //slow down each ball by 30 %
			speed[i].multiplyScalar(0.7);
		
		}
	}
}

	var rollFric = 0.2;
	var timeSinceLastCall = 0;

function render() {
    requestAnimationFrame(render);
	
	var dt = computerClock.getDelta();
    var t = computerClock.getElapsedTime();

	
	
	for(var i = 0; i < tableCenter.children.length; i++){
		
		if(dt>0.15) break; //hack to avoid balls moving too much if the browser takes too long to compute a frame
						   //they get stuck in each other on start or in the walls otherwise
		var ball = tableCenter.children[i];
		detectCollision(ball,i);
		
		
		var rotAxis = new THREE.Vector3(0,0,1);
		rotAxis.cross(speed[i]).normalize();
		var omega = speed[i].length() / ballRadius; 

		
		// Translation
		var pos = ball.position.add(speed[i].clone().multiplyScalar(dt));
		var transMat = new THREE.Matrix4();
		transMat.makeTranslation(pos.x, pos.y, pos.z);

		// Rotation
		var theta = omega*t; 
		var rotMat = new THREE.Matrix4();
		rotMat.makeRotationAxis(rotAxis, theta); 
		


		ball.matrix.multiplyMatrices(transMat, rotMat); 
		
		
		if(Math.abs(ball.position.x) + ballRadius > sizeOfTable/2){ //detection of border collision
			//to avoid the ball getting stuck in the cushions we check if the ball is still going into the border
			//and only then we change the speed; if its going away we don't touch the speed even though it is still in the cushion
			if(ball.position.x > 0 && speed[i].x > 0){
				speed[i].x = - speed[i].x;
				speed[i].multiplyScalar(0.8); //slow ball down by 20 % when it hits the cushions
			}
			else if(ball.position.x < 0 && speed[i].x < 0){
				speed[i].x = -speed[i].x;
				speed[i].multiplyScalar(0.8); //slow ball down by 20 % when it hits the cushions
			}
		}					
		if(Math.abs(ball.position.y) + ballRadius > sizeOfTable/4){ //detection of border collision
			if(ball.position.y > 0 && speed[i].y > 0){
				speed[i].y = - speed[i].y; 
				speed[i].multiplyScalar(0.8); //slow ball down by 20 % when it hits the cushions
			}
			else if(ball.position.y < 0 && speed[i].y < 0){
				speed[i].y = -speed[i].y;
				speed[i].multiplyScalar(0.8); //slow ball down by 20 % when it hits the cushions
			}
		}
		//slowing the balls down messes up their rotation
		speed[i].multiplyScalar(1-rollFric*dt); //slow down speed by rollFric factor every 1 sec

		
	}
    controls.update();
    renderer.render(scene, camera);
}

render();