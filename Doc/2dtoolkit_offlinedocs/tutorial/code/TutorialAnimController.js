#pragma strict

// Link to the animated sprite
private var anim : tk2dSpriteAnimator;

// This script must be attached to the sprite to work.
anim = GetComponent(tk2dSpriteAnimator);

// State variable to see if the character is walking.
private var walking = false;

// This is called once the hit animation has compelted playing
// It returns to playing whatever animation was active before hit
// was playing.
function HitCompleteDelegate(sprite : tk2dSpriteAnimator, clip : tk2dSpriteAnimationClip) {
	if (walking) {
		anim.Play("walk");
	} 
	else {
		anim.Play("idle");
	}
}

// Update is called once per frame
function Update() {
	if (Input.GetKey(KeyCode.A)) {
		// Only play the clip if it is not already playing.
		// Calling play will restart the clip if it is already playing.
		if (!anim.IsPlaying("hit")) {
			anim.Play("hit");

			// The delegate is used here to return to the previously
			// playing clip after the "hit" animation is done playing.
			anim.AnimationCompleted = HitCompleteDelegate;
		}
	}

	if (Input.GetKey(KeyCode.D)) {
		if (!anim.IsPlaying("walk")) {

			// Walk is a looping animation
			// A looping animation never completes...
			anim.Play("walk");

			// We dont have any reason for detecting when it completes
			anim.AnimationCompleted = null;
			walking = true;
		}
	}

	if (Input.GetKey(KeyCode.W)) {
		if (!anim.IsPlaying("idle")) {
			anim.Play("idle");
			// We dont have any reason for detecting when it completes
			anim.AnimationCompleted = null;
			walking = false;
		}
	}
}
