class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"type" => "Asset", "id" => "a", "parent" => nil, "name" => "Assets"},
        {"type" => "Asset", "id" => 1, "parent" => "a", "number" => "101", "name" => "Cash"},
        {"type" => "Asset", "id" => 2, "parent" => "a", "number" => "120", "name" => "Accounts Receivable"},
        {"type" => "Asset", "id" => 3, "parent" => "a", "number" => "140", "name" => "Merchandise Inventory"},
        {"type" => "Asset", "id" => 4, "parent" => "a", "number" => "150", "name" => "Supplies"},
        {"type" => "Asset", "id" => 5, "parent" => "a", "number" => "160", "name" => "Prepaid Insurance"},
        {"type" => "Asset", "id" => 6, "parent" => "a", "number" => "170", "name" => "Land"},
        {"type" => "Asset", "id" => 7, "parent" => "a", "number" => "175", "name" => "Buildings"},
        {"type" => "Asset", "id" => 8, "parent" => "a", "number" => "178", "name" => "Accumulated Depreciation - Buildings"},
        {"type" => "Asset", "id" => 9, "parent" => "a", "number" => "180", "name" => "Equipment"},
        {"type" => "Asset", "id" => 10, "parent" => "a", "number" => "188", "name" => "Accumulated Depreciation - Equipment"},
        {"type" => "Liability", "id" => "l", "parent" => nil, "number" => "l", "name" => "Liabilities"},
        {"type" => "Liability", "id" => 11, "parent" => "l", "number" => "210", "name" => "Notes Payable"},
        {"type" => "Liability", "id" => 12, "parent" => "l", "number" => "215", "name" => "Accounts Payable"},
        {"type" => "Liability", "id" => 13, "parent" => "l", "number" => "220", "name" => "Wages Payable"},
        {"type" => "Liability", "id" => 14, "parent" => "l", "number" => "230", "name" => "Interest Payable"},
        {"type" => "Liability", "id" => 15, "parent" => "l", "number" => "240", "name" => "Unearned Revenues"},
        {"type" => "Liability", "id" => 16, "parent" => "l", "number" => "250", "name" => "Mortage Loan Payable"},
        {"type" => "Equity", "id" => "eq", "parent" => nil, "number" => "eq", "name" => "Equity"},
        {"type" => "Revenue", "id" => "r", "parent" => nil, "number" => "r", "name" => "Revenues"},
        {"type" => "Revenue", "id" => "or", "parent" => "r", "number" => "", "name" => "Operating Revenue"},
        {"type" => "Revenue", "id" => 17, "parent" => "or", "number" => "310", "name" => "Service Revenues"},
        {"type" => "Revenue", "id" => "nor", "parent" => "r", "number" => "", "name" => "Non-Operating Revenue"},
        {"type" => "Revenue", "id" => 18, "parent" => "nor", "number" => "810", "name" => "Interest Revenues"},
        {"type" => "Revenue", "id" => 19, "parent" => "nor", "number" => "910", "name" => "Asset Sale Gain"},
        {"type" => "Revenue", "id" => 20, "parent" => "nor", "number" => "960", "name" => "Asset Sale Loss"},
        {"type" => "Expense", "id" => "ex", "parent" => nil, "number" => "ex", "name" => "Expenses"},
        {"type" => "Expense", "id" => 21, "parent" => "ex", "number" => "500", "name" => "Salaries Expense"},
        {"type" => "Expense", "id" => 22, "parent" => "ex", "number" => "510", "name" => "Wages Expense"},
        {"type" => "Expense", "id" => 23, "parent" => "ex", "number" => "540", "name" => "Supplies Expense"},
        {"type" => "Expense", "id" => 24, "parent" => "ex", "number" => "560", "name" => "Rent Expense"},
        {"type" => "Expense", "id" => 25, "parent" => "ex", "number" => "570", "name" => "Utilities Expense"},
        {"type" => "Expense", "id" => 26, "parent" => "ex", "number" => "576", "name" => "Telephone Expense"},
        {"type" => "Expense", "id" => 27, "parent" => "ex", "number" => "610", "name" => "Advertising Expense"},
        {"type" => "Expense", "id" => 28, "parent" => "ex", "number" => "750", "name" => "Depreciation Expense"},
      ],
      "links" => [
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>1},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>2},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>3},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>4},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>5},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>6},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>7},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>8},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>9},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>10},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>11},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>12},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>13},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..200), "id"=>14},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..200), "id"=>15},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..300), "id"=>16},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..300), "id"=>17},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..500), "id"=>18},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..500), "id"=>19},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>20},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>21},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>22},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..100), "id"=>23},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..200), "id"=>24},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..200), "id"=>25},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..300), "id"=>26},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..300), "id"=>27},
        {"source" => Random.new.rand(1..28),"target" => Random.new.rand(1..28),"value" => Random.new.rand(1..500), "id"=>28},
        {"source" => "eq","target" => 1,"value" => Random.new.rand(1..500), "id"=>29},
        {"source" => 1,"target" => 21,"value" => Random.new.rand(1..500), "id"=>30},
        {"source" => 1,"target" => 24,"value" => Random.new.rand(1..500), "id"=>31},
        {"source" => 17,"target" => 1,"value" => Random.new.rand(1..500), "id"=>32},
      ]
    }
    puts data["links"]
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
