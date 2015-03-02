class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"node" => 0,"name" => "node0", "id"=>0, "parent" => nil},
        {"node" => 1,"name" => "node1", "id"=>1, "parent" => 0},
        {"node" => 2,"name" => "node2", "id"=>2, "parent" => 0},
        {"node" => 3,"name" => "node3", "id"=>3, "parent" => 0},
        {"node" => 4,"name" => "node4", "id"=>4, "parent" => 0},
        {"node" => 5,"name" => "node5", "id"=>5, "parent" => nil},
        {"node" => 6,"name" => "node6", "id"=>6, "parent" => nil},
        {"node" => 7,"name" => "node7", "id"=>7, "parent" => nil},
        {"node" => 8,"name" => "node8", "id"=>8, "parent" => nil},
        {"node" => 9,"name" => "node9", "id"=>9, "parent" => nil},
      ],
      "links" => [
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>1},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>2},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>3},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>4},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>5},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>6},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>7},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>8},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>9},
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..1000), "id"=>10},
      ]
    }
    puts data["links"]
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
