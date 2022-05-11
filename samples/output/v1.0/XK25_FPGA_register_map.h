#ifndef __TINY_REGISTER_MAP__
#define __TINY_MAP_REGISTER_MAP__

enum TINY_ADDR_MAP_REGS {
   
  REG1 = 0x2d,

};


/* REG1 registers */
// Hardware rights: r, Software rights: r
#define REG_AA  GENMASK(0,15)
#define REG_AA_RESET_VALUE 0
// Hardware rights: w, Software rights: r
#define REG_BB  GENMASK(16,31)
#define REG_BB_RESET_VALUE undefined



#endif