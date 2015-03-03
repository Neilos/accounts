class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"node" => 0,"name" => "node0", "id"=>"p", "parent" => nil},
        {"node" => 1,"name" => "node1", "id"=>1, "parent" => "p"},
        {"node" => 2,"name" => "node2", "id"=>2, "parent" => "p"},
        {"node" => 3,"name" => "node3", "id"=>3, "parent" => "p"},
        {"node" => 4,"name" => "node4", "id"=>4, "parent" => "p"},
        {"node" => 5,"name" => "node5", "id"=>5, "parent" => nil},
        {"node" => 6,"name" => "node6", "id"=>6, "parent" => nil},
        {"node" => 7,"name" => "node7", "id"=>7, "parent" => nil},
        {"node" => 8,"name" => "node8", "id"=>8, "parent" => nil},
        {"node" => 9,"name" => "node9", "id"=>9, "parent" => nil},
      ],
      "links" => [
        {"source"=>3, "target"=>5, "value"=>88, "id"=>1},
        {"source"=>1, "target"=>7, "value"=>52, "id"=>2},
        {"source"=>6, "target"=>5, "value"=>91, "id"=>3},
        {"source"=>1, "target"=>3, "value"=>76, "id"=>4},
        {"source"=>3, "target"=>8, "value"=>2, "id"=>5},
        {"source"=>5, "target"=>7, "value"=>16, "id"=>6},
        {"source"=>6, "target"=>4, "value"=>94, "id"=>7},
        {"source"=>4, "target"=>3, "value"=>66, "id"=>8},
        {"source"=>6, "target"=>7, "value"=>78, "id"=>9},
        {"source"=>8, "target"=>3, "value"=>50, "id"=>10},
        {"source"=>5, "target"=>6, "value"=>93, "id"=>11},
        {"source"=>1, "target"=>5, "value"=>75, "id"=>12},
        {"source"=>1, "target"=>6, "value"=>17, "id"=>13},
        {"source"=>7, "target"=>3, "value"=>108, "id"=>14},
        {"source"=>7, "target"=>7, "value"=>108, "id"=>15},
        {"source"=>5, "target"=>6, "value"=>93, "id"=>16},


        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>1},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>2},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>3},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>4},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>5},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>6},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>7},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>8},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>9},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>10},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>11},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>12},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..100), "id"=>13},
        # {"source" => Random.new.rand(1..8),"target" => Random.new.rand(1..8),"value" => Random.new.rand(1..1000), "id"=>14},
      ]
    }
    puts data["links"]
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
