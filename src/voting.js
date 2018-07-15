import web3 from './web3';
const address = '0xaeAbcDd8FE98AF611935538893A02643039314Cd';

const abi = [{
    constant: false,
    inputs: [],
    name: 'buy',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{
      name: 'account',
      type: 'address'
    }],
    name: 'transferTo',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{
        name: 'tokens',
        type: 'uint256'
      },
      {
        name: 'pricePerToken',
        type: 'uint256'
      },
      {
        name: 'candidateNames',
        type: 'address[]'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    constant: false,
    inputs: [{
        name: 'candidate',
        type: 'address'
      },
      {
        name: 'votesInTokens',
        type: 'uint256'
      }
    ],
    name: 'voteForCandidate',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'allCandidates',
    outputs: [{
      name: '',
      type: 'address[]'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'balanceTokens',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: '',
      type: 'uint256'
    }],
    name: 'candidateList',
    outputs: [{
      name: '',
      type: 'address'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: 'candidate',
      type: 'address'
    }],
    name: 'indexOfCandidate',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'tokenPrice',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'tokensSold',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalTokens',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: 'candidate',
      type: 'address'
    }],
    name: 'totalVotesFor',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: 'candidate',
      type: 'address'
    }],
    name: 'validCandidate',
    outputs: [{
      name: '',
      type: 'bool'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: 'user',
      type: 'address'
    }],
    name: 'voterDetails',
    outputs: [{
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'uint256[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: '',
      type: 'address'
    }],
    name: 'voterInfo',
    outputs: [{
        name: 'voterAddress',
        type: 'address'
      },
      {
        name: 'tokensBought',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{
      name: '',
      type: 'address'
    }],
    name: 'votesReceived',
    outputs: [{
      name: '',
      type: 'uint256'
    }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

export default new web3.eth.Contract(abi, address);