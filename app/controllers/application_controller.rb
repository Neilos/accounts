class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"node" => 0,"name" => "node0", "id"=>1},
        {"node" => 1,"name" => "node1", "id"=>2},
        {"node" => 2,"name" => "node2", "id"=>3},
        {"node" => 3,"name" => "node3", "id"=>4},
        {"node" => 4,"name" => "node4", "id"=>5},
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
        {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>10},
      ]
    }
    puts data["links"]
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
