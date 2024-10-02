import Result  "mo:base/Result";

actor {
  stable var lastName : Text = "Roland";

  public func updateLastName(newName : Text) : async Text {
    let result = await setLastName(newName);
    switch (result) {
      case (#ok(())) {
        "LastName updated successfully.";
      };
      case (#err(error)) {
        "Failed to update LastName: " # error;
      };
    }
  };

	public query func getLastName() : async Text {
    lastName;
  };

  func setLastName(name : Text) : async Result.Result<(), Text> {
    lastName := name;
    #ok(());
  };

};