class MoleScript extends UnityEngine.MonoBehaviour
{
	public var sprite : tk2dClippedSprite;
	
	private var height : float;
	private var speed : float;
	private var timeLimit : float;
	private var spriteRec : Rect;
	private var whacked = false;
	private var transformY : float;
	
	private var colliderTransform : Transform;

	function ColliderTransform()
	{
		return colliderTransform;
	}
	
	// Trigger the mole.  It is now 'active' and the sprite is set to the default mole sprite, just in case it isn't.
	
	function Trigger(tl)
	{
		sprite.gameObject.SetActive(true);
		whacked = false;
		sprite.SetSprite("Mole_Normal");
		timeLimit = tl;
		MainLoop();
	}
	
	function Start()
	{
		timeLimit = 1.0f;
		speed = 2.0f;
		
		// Get the 'size' of the mole sprite
		bounds = sprite.GetUntrimmedBounds();
		height = bounds.max.y - bounds.min.y;
		
		// We want the mole to be fully clipped on the Y axis initially.
		spriteRec = sprite.ClipRect;
		spriteRec.y = 1.0f;
		sprite.ClipRect = spriteRec;

		colliderTransform = sprite.transform;
		
		//Move the mole sprite into the correct place relative to the hole
		localPos = sprite.transform.localPosition;
		transformY = localPos.y;
		localPos.y = transformY - (height * sprite.ClipRect.y);
		sprite.transform.localPosition = localPos;
		
		sprite.gameObject.SetActive (false);
		
		// Add mole to the main game script's mole container
		MainGameScript.Instance().RegisterMole(this);
	}
	
	// Main loop for the sprite.  Move up, then wait, then move down again. Simple.
	function MainLoop()
	{
		yield MoveUp();
		yield WaitForHit();
		yield MoveDown();
	}
	
	// As it 'moves up', we see more of the sprite and the position of it has to be adjusted so that the 'bottom' of the sprite is in line with the hole.
	function MoveUp()
	{	
		while(spriteRec.y > 0.0f)
		{
			spriteRec = sprite.ClipRect;
			newYPos = spriteRec.y - speed * Time.deltaTime;
			spriteRec.y = newYPos < 0.0f ? 0.0f : newYPos;
			sprite.ClipRect = spriteRec;
			
			localPos = sprite.transform.localPosition;
			localPos.y = transformY - (height * sprite.ClipRect.y);
			sprite.transform.localPosition = localPos;
			
			yield;
		}
	}
	
	// Give the player a chance to hit the mole.
	function WaitForHit()
	{
		var time : float = 0.0f;
		
		while(!whacked && time < timeLimit)
		{
			time += Time.deltaTime;
			yield;
		}
	}
	
	// Same as the MoveUp function but the other way around!	
	function MoveDown()
	{		
		while(spriteRec.y < 1.0f)
		{ 
			spriteRec = sprite.ClipRect;
			newYPos = spriteRec.y + speed * Time.deltaTime;
			spriteRec.y = newYPos > 1.0f ? 1.0f : newYPos;
			sprite.ClipRect = spriteRec;
			
			localPos = sprite.transform.localPosition;
			localPos.y = transformY - (height * sprite.ClipRect.y);
			sprite.transform.localPosition = localPos;
			
			yield;
		}

		sprite.gameObject.SetActive(false);
	}
	
	// Mole has been hit
	function Whack()
	{
		whacked = true;
		sprite.SetSprite("Mole_Hit");
	}
	
	function Whacked()
	{
		return whacked;	
	}
}
