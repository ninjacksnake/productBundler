import { Injectable } from '@angular/core';
import { IBundle } from '../Dtos/bundle.dto';

@Injectable({
    providedIn: 'root'
})
export class BundlePrintService {

    constructor() { }


    /**
     * Prints a bundle with all its details including products
     * @param bundle The bundle to print
     */
    printBundle(bundle: IBundle): void {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        const toCurrency = (value: number): string => {
            return value.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
        }
        if (printWindow) {
            // Generate products table HTML
            // Debug: log products to see structure
            console.log('Bundle products:', bundle.products);
            console.log('Bundle:', bundle);

            const productsTableHTML = bundle.products && bundle.products.length > 0 ? `
        <div class="section">
          <div class="section-title">Productos en el Combo (${bundle.products.length})</div>
          <table class="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio PM</th>
                <th>Precio CF</th>
              </tr>
            </thead>
            <tbody>
              ${bundle.products.map((product: any) => {
                console.log('Product:', product);
                return `
                <tr>
                  <td class="product-id">${product.productId || product.id || 'N/A'}</td>
                  <td class="product-name">${product.product.name || 'Sin nombre'}</td>
                  <td class="quantity">${product.product.quantity || 1}</td>
                  <td class="price">$${toCurrency(product.product.pricePM || 0)}</td>
                  <td class="price">$${toCurrency(product.product.priceCF || 0)}</td>
                </tr>   
              `}).join('')}
            </tbody>
          </table>
        </div>
      ` : '';

            const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Combo: ${bundle.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 900px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #667eea;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #667eea;
              margin: 0 0 10px 0;
              font-size: 2rem;
            }
            .header p {
              color: #666;
              margin: 5px 0;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 1.2rem;
              font-weight: bold;
              color: #2d3748;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 8px;
              margin-bottom: 15px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 20px;
            }
            .info-item {
              padding: 10px;
              background: #f7fafc;
              border-radius: 8px;
            }
            .info-label {
              font-weight: bold;
              color: #4a5568;
              font-size: 0.9rem;
            }
            .info-value {
              color: #2d3748;
              font-size: 1.1rem;
              margin-top: 5px;
            }
            .description {
              background: #f7fafc;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #667eea;
              margin-bottom: 20px;
            }
            .price-highlight {
              color: #667eea;
              font-weight: bold;
              font-size: 1.3rem;
            }
            .date-info {
              color: #718096;
              font-size: 0.9rem;
            }
            .products-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .products-table thead {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .products-table th {
              padding: 12px;
              text-align: left;
              font-weight: 600;
              font-size: 0.9rem;
            }
            .products-table td {
              padding: 10px 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            .products-table tbody tr:hover {
              background-color: #f7fafc;
            }
            .products-table tbody tr:last-child td {
              border-bottom: none;
            }
            .product-id {
              font-family: 'Courier New', monospace;
              font-weight: 600;
              color: #667eea;
              background: #edf2f7;
              padding: 4px 8px;
              border-radius: 4px;
              display: inline-block;
            }
            .product-name {
              font-weight: 500;
              color: #2d3748;
            }
            .quantity {
              text-align: center;
              font-weight: 600;
              color: #4299e1;
            }
            .price {
              font-weight: 600;
              color: #2d3748;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e2e8f0;
              text-align: center;
              color: #718096;
              font-size: 0.9rem;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
              .products-table {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${bundle.name}</h1>
            <p>Combo ID: ${bundle.id}</p>
          </div>

          <div class="section">
            <div class="section-title">Descripción</div>
            <div class="description">
              ${bundle.description}
            </div>
          </div>

          ${productsTableHTML}

          <div class="section">
            <div class="section-title">Información de Precios</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Precio Por Mayor (PM)</div>
                <div class="info-value price-highlight">$${toCurrency(bundle.pricePM)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Precio Consumidor Final (CF)</div>
                <div class="info-value price-highlight">$${toCurrency(bundle.priceCF)}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Información de Fechas</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Fecha de Creación</div>
                <div class="info-value date-info">${new Date(bundle.createdAt || bundle.createdDate).toLocaleDateString('es-ES')}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Última Actualización</div>
                <div class="info-value date-info">${new Date(bundle.updatedAt || bundle.updatedDate).toLocaleDateString('es-ES')}</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Documento generado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
        </html>
      `;

            printWindow.document.write(printContent);
            printWindow.document.close();
        }
    }
}
