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
        # {"source"=>3, "target"=>1, "value"=>8, "id"=>1},
        # {"source"=>0, "target"=>0, "value"=>12, "id"=>2},
        # {"source"=>3, "target"=>1, "value"=>78, "id"=>3},
        # {"source"=>2, "target"=>3, "value"=>3, "id"=>4},
        # {"source"=>4, "target"=>0, "value"=>3, "id"=>5},
        # {"source"=>3, "target"=>4, "value"=>50, "id"=>6},
        # {"source"=>2, "target"=>4, "value"=>35, "id"=>7},
        # {"source"=>0, "target"=>1, "value"=>95, "id"=>8},
        # {"source"=>1, "target"=>1, "value"=>34, "id"=>9},
        # {"source"=>1, "target"=>1, "value"=>71, "id"=>10},

        # {"source"=>2, "target"=>4, "value"=>841, "id"=>1},
        # {"source"=>2, "target"=>2, "value"=>93, "id"=>2},
        # {"source"=>4, "target"=>4, "value"=>639, "id"=>3},
        # {"source"=>2, "target"=>3, "value"=>59, "id"=>4},
        # {"source"=>3, "target"=>1, "value"=>256, "id"=>5},
        # {"source"=>2, "target"=>1, "value"=>705, "id"=>6},
        # {"source"=>4, "target"=>1, "value"=>522, "id"=>7},
        # {"source"=>4, "target"=>4, "value"=>341, "id"=>8},
        # {"source"=>1, "target"=>3, "value"=>544, "id"=>9},
        # {"source"=>0, "target"=>2, "value"=>808, "id"=>10},

        {"source"=>4, "target"=>4, "value"=>18, "id"=>1},
        {"source"=>3, "target"=>0, "value"=>24, "id"=>2},
        {"source"=>1, "target"=>4, "value"=>22, "id"=>3},
        {"source"=>2, "target"=>3, "value"=>26, "id"=>4},
        {"source"=>0, "target"=>3, "value"=>2, "id"=>5},
        {"source"=>3, "target"=>3, "value"=>63, "id"=>6},
        {"source"=>0, "target"=>4, "value"=>100, "id"=>7},
        {"source"=>3, "target"=>4, "value"=>13, "id"=>8},
        {"source"=>2, "target"=>1, "value"=>24, "id"=>9},
        {"source"=>4, "target"=>1, "value"=>2, "id"=>10},

        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>1},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>2},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>3},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>4},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>5},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>6},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>7},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>8},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>9},
        # {"source" => Random.new.rand(0..4),"target" => Random.new.rand(0..4),"value" => Random.new.rand(1..100), "id"=>10},
      ]
    }
    puts data["links"]
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
