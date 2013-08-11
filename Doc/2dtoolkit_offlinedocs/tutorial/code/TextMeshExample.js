#pragma strict

private var textMesh : tk2dTextMesh;
textMesh = GetComponent(tk2dTextMesh);

private var score = 0;

// Update is called once per frame
function Update() {
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
