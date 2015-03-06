class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"type" => "Asset", "name" => "nodep", "id"=>"p", "parent" => nil},
        {"type" => "Asset", "name" => "node1", "id"=>1, "parent" => "p"},
        {"type" => "Asset", "name" => "node2", "id"=>2, "parent" => "p"},
        {"type" => "Asset", "name" => "node3", "id"=>3, "parent" => "p"},
        {"type" => "Asset", "name" => "node4", "id"=>4, "parent" => "p"},
        {"type" => "Expense", "name" => "nodeq", "id"=>"q", "parent" => nil},
        {"type" => "Expense", "name" => "node5", "id"=>5, "parent" => "q"},
        {"type" => "Expense", "name" => "node6", "id"=>6, "parent" => "q"},
        {"type" => "Expense", "name" => "node7", "id"=>7, "parent" => "q"},
        {"type" => "Revenue", "name" => "node8", "id"=>8, "parent" => nil},
        {"type" => "Revenue", "name" => "node9", "id"=>9, "parent" => nil},
        {"type" => "Revenue", "name" => "node10", "id"=>10, "parent" => nil},
        {"type" => "Equity", "name" => "node11", "id"=>11, "parent" => nil},
        {"type" => "Equity", "name" => "node12", "id"=>12, "parent" => nil},
        {"type" => "Liability", "name" => "node13", "id"=>13, "parent" => nil},
        {"type" => "Liability", "name" => "node14", "id"=>14, "parent" => nil},
        {"type" => "Liability", "name" => "node15", "id"=>15, "parent" => nil},
      ],
      "links" => [
        {"source"=>12, "target"=>10, "value"=>21, "id"=>1},
        {"source"=>8, "target"=>13, "value"=>32, "id"=>2},
        {"source"=>6, "target"=>11, "value"=>63, "id"=>3},
        {"source"=>6, "target"=>3, "value"=>60, "id"=>4},
        {"source"=>8, "target"=>14, "value"=>43, "id"=>5},
        {"source"=>9, "target"=>9, "value"=>27, "id"=>6},
        {"source"=>5, "target"=>4, "value"=>99, "id"=>7},
        {"source"=>9, "target"=>1, "value"=>74, "id"=>8},
        {"source"=>10, "target"=>4, "value"=>39, "id"=>9},
        {"source"=>3, "target"=>5, "value"=>85, "id"=>10},
        {"source"=>2, "target"=>15, "value"=>82, "id"=>11},
        {"source"=>7, "target"=>6, "value"=>100, "id"=>12},
        {"source"=>5, "target"=>10, "value"=>36, "id"=>13},
        {"source"=>2, "target"=>11, "value"=>24, "id"=>14},
        {"source"=>1, "target"=>9, "value"=>63, "id"=>15},
        {"source"=>12, "target"=>3, "value"=>44, "id"=>16},
        {"source"=>13, "target"=>1, "value"=>50, "id"=>17},
        {"source"=>6, "target"=>1, "value"=>6, "id"=>18},
        {"source"=>4, "target"=>11, "value"=>644, "id"=>19},


        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>1},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>2},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>3},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>4},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>5},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>6},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>7},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>8},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>9},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>10},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>11},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>12},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>13},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..1000), "id"=>14},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>15},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>16},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>17},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..100), "id"=>18},
        # {"source" => Random.new.rand(1..15),"target" => Random.new.rand(1..15),"value" => Random.new.rand(1..1000), "id"=>19},
      ]
    }
    puts data["links"]
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
