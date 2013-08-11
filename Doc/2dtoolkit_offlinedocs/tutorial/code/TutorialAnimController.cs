using UnityEngine;
using System.Collections;

public class TutorialAnimController : MonoBehaviour {

	// Link to the animated sprite
	private tk2dSpriteAnimator anim;

	// State variable to see if the character is walking.
	private bool walking = false;

	// Use this for initialization
	void Start () {
		// This script must be attached to the sprite to work.
		anim = GetComponent<tk2dSpriteAnimator>();
	}

	// This is called once the hit animation has compelted playing
	// It returns to playing whatever animation was active before hit
	// was playing.
	void HitCompleteDelegate(tk2dSpriteAnimator sprite, tk2dSpriteAnimationClip clip) {
		if (walking) {
			anim.Play("walk");
		} 
		else {
			anim.Play("idle");
		}
	}

	// Update is called once per frame
	void Update () {
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
}
