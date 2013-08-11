using UnityEngine;
using System.Collections;

public class DynamicCreateBatcher : MonoBehaviour {

	// we are just using one sprite collection for all sprites here, but
	// you can have as many as you like.
	public tk2dSpriteCollectionData spriteCollection;

	void Awake() {
		GameObject go = new GameObject();

		tk2dStaticSpriteBatcher batcher = go.AddComponent<tk2dStaticSpriteBatcher>();
		batcher.batchedSprites = new tk2dBatchedSprite[20];

		for (int i = 0; i < batcher.batchedSprites.Length; ++i) {
			tk2dBatchedSprite bs = new tk2dBatchedSprite();

			// assign sprite collection and sprite Id for this batched sprite
			bs.spriteCollection = spriteCollection;
			bs.spriteId = spriteCollection.GetSpriteIdByName("crate");

			Vector3 pos = new Vector3((i - batcher.batchedSprites.Length / 2) * 0.1f, Random.value * 0.2f, 0);

			// Assign the relative matrix. Use this in place of bs.position
			bs.relativeMatrix.SetTRS(pos, Quaternion.identity, Vector3.one);

			batcher.batchedSprites[i] = bs;
		}

		// Don't create colliders when you don't need them. It is very expensive to
		// generate colliders at runtime.
		batcher.SetFlag( tk2dStaticSpriteBatcher.Flags.GenerateCollider, false );

		batcher.Build();
	}
}
