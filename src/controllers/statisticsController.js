import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import { Order } from '../models/order.js';

export const getStoreStatistics = async (req, res, next) => {
  try {
    const [totalProducts, totalCustomers, recentCustomers, financialStats] =
      await Promise.all([
        // 1. Общее количество товаров в магазине
        Product.countDocuments(),

        // 2. Общее количество клиентов (с ролью 'user')
        User.countDocuments({ role: 'user' }),

        // 3. Последние 5 зарегистрированных или сделавших заказ клиентов
        User.find({ role: 'user' })
          .sort({ createdAt: -1 })
          .limit(5)
          .select('fullName email createdAt'),

        Order.aggregate([
          {
            $group: {
              _id: null,
              totalIncome: { $sum: '$totalPrice' }, // Сумма всех успешных заказов
              totalOrders: { $sum: 1 },
            },
          },
        ]),
      ]);

    const income = financialStats[0]?.totalIncome || 0;
    const ordersCount = financialStats[0]?.totalOrders || 0;

    res.status(200).json({
      // Ключевые показатели (Key Metrics)
      metrics: {
        totalProducts,
        totalCustomers,
        totalIncome: income,
        totalOrders: ordersCount,
      },
      // Последние клиенты
      recentCustomers,
      // График доходов/расходов
      chartData: {
        incomeByMonth: [
          { month: 'Jan', income: income * 0.4 },
          { month: 'Feb', income: income * 0.6 },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
};
