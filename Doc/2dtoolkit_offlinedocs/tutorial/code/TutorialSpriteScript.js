#pragma strict

private var sprite : tk2dSprite;
sprite = GetComponent(tk2dSprite);

function Update() {
	if (Input.GetKeyDown(KeyCode.A)) {
		sprite.color = Color.red;
	}
	if (Input.GetKeyDown(KeyCode.S)) {
		sprite.color = Color.white;
	}
	if (Input.GetKeyDown(KeyCode.Q)) {
		sprite.scale = Vector3(2, 2, 2);
	}
	if (Input.GetKeyDown(KeyCode.W)) {
		sprite.SetSprite("crate");
	}
}
