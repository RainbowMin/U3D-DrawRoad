using UnityEngine;
using System.Collections;

public class TextMeshExample : MonoBehaviour {

	tk2dTextMesh textMesh;
	int score = 0;

	// Use this for initialization
	void Start () {
		textMesh = GetComponent<tk2dTextMesh>();
	}

	// Update is called once per frame
	void Update () {
		if (Input.GetKey(KeyCode.Q))
		{
			score++;
			
			textMesh.text = "SCORE: " + score.ToString();
			
			// This is important, your changes will not be updated until you call Commit()
			// This is so you can change multiple parameters without reconstructing
			// the mesh repeatedly
			textMesh.Commit();
		}
	}
}
