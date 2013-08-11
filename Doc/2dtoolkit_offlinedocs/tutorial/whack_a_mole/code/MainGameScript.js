class MainGameScript extends UnityEngine.MonoBehaviour
{
	private var moles = new Array();
	private var gameEnd = false;
	private var score : int;
	private var timeLimitMS : int;
	private var moleLimit : int;
	
	public var gameCam : Camera;
	public var dustAnimator : tk2dSpriteAnimator;

	// Treat this class as a singleton.  This will hold the instance of the class.

	private static var instance : MainGameScript;
	
	static function Instance()
	{
		return instance;
	}
	
	function Awake()
	{
		instance = this;
	}
	
	function Start () 
	{
		gameEnd = false;
		timeLimitMS = 3000;
		score = 0;
		moleLimit = 3;
		
		// Yield here to give everything else a chance to be set up before we start our main game loop
		
		yield;  // wait for the next frame!

		dustAnimator.gameObject.SetActive(false);
		MainGameLoop();
	}
	
	function Update()
	{
		// Check to see if mouse has been clicked, and if so check to see if it has 'hit' any of the moles, and check which mole.
		if(Input.GetButtonDown ("Fire1"))
		{
			var ray = gameCam.ScreenPointToRay(Input.mousePosition);
			var hit : RaycastHit;
			
			if(Physics.Raycast(ray, hit))
			{
				for(var mole in moles)
				{
					if(mole.sprite.gameObject.activeSelf && mole.ColliderTransform() == hit.transform)
					{
						mole.Whack();
						CallAnim(mole);
					}
				}
			}
		}
	}
	
	function MainGameLoop()
	{
		var hitTimeLimit : float = 1.0f;
		var randomMole : int;
		
		while(!gameEnd)
		{
			yield OkToTrigger();
			yield WaitForSeconds(Random.Range(1, timeLimitMS) / 1000.0f);
			
			randomMole = Random.Range(0, moles.Count - 1);
			
			while(moles[randomMole].sprite.gameObject.activeSelf)
			{
				randomMole = Random.Range(0, moles.Count - 1);
			}
				
			moles[ randomMole ].Trigger(hitTimeLimit);
			hitTimeLimit -= hitTimeLimit <= 0.0f ? 0.0f : 0.01f;	// Less time to hit the next mole

			yield;
		}
	}
	
	function RegisterMole(who)
	{
		moles.Add(who);
	}
	
	// Currently only 3 moles at a time can be active.  So if there are that many, then we can't trigger another one...
	function OkToTrigger()
	{
		var molesActive : int;

		do
		{
			yield;
			molesActive = 0;
			
			for(var mole in moles)
			{
				molesActive += mole.sprite.gameObject.activeSelf ? 1 : 0;
			}
		}
		while(molesActive >= moleLimit);

		yield;
	}
	
	function CallAnim(mole)
	{
		yield WaitForSeconds(0.25f);
		
		var newAnimator : tk2dSpriteAnimator;
		newAnimator = Instantiate(dustAnimator, new Vector3(mole.transform.position.x, mole.transform.position.y, dustAnimator.transform.position.z), dustAnimator.transform.rotation); // as tk2dSpriteAnimator; 
		newAnimator.gameObject.SetActive(true);
		newAnimator.Play("DustCloud");
		
		while(newAnimator.IsPlaying("DustCloud"))
		{
			yield;	
		}	
		Destroy(newAnimator.gameObject);
	}
} 
